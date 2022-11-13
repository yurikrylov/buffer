import express, { Express, Request, Response } from 'express';
import { createClient } from 'redis';
import { DataPiece } from './interfaces/dataPiece';
import * as http from 'http';
import * as querystring from 'querystring';

const app: Express = express();
const jsonParser = express.json();

const httpPort = process.env.HTTP_PORT;
const redisHost = { url: process.env.REDIS_HOST };
const chHost = process.env.CLICKHOUSE_HOST;
const chPort = process.env.CLICKHOUSE_PORT;
const chUser = process.env.CLICKHOUSE_USER;
const chPassword = process.env.CLICKHOUSE_PASSWORD;

const maxLength = process.env.MAXLENGTH;
const timeLimit = process.env.MAXTIME;

const redisClient = createClient(redisHost);
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect()
// not tested 
async function chInsert(table: string, recs: DataPiece[]) {
    let inserts = 0;
    function insert({ table, keys }) {
        const query = `INSERT INTO ${table} (${keys.join(',')}) FORMAT TabSeparated`

        const qs = querystring.stringify({
            query,
            user: chUser,
            password: chPassword
        })

        const options = {
            host: chHost,
            port: chPort,
            path: `/?${qs}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return http.request(options)
    }
    function end(req) {
        return new Promise((resolve, reject) => {
            req.on('error', err => {
                reject(new ClickhouseInsertError(err.message))
            })

            req.once('response', res => {
                let body = ''
                res.on('data', function (chunk) {
                    body += chunk.toString()
                })

                res.on('end', () => {
                    if (body) reject(new ClickhouseInsertError(body))
                    else resolve()
                })

                res.on('error', err => {
                    console.error(err)
                    reject(err)
                })
            })

            req.end()
        })
    }
    if (recs.length) {
        const keys = Object.keys(JSON.parse(recs[0]))
        const startKeysSign = keys.join(',')
        const chInsertStream = insert({ table, keys })

        for (let row of recs) {
            const { record, sign } = parseAndCheckSign(row, startKeysSign)
            if (!sign) break
            chInsertStream.write(Object.values(record).join('\t') + '\n')
            inserts++
        }

        if (inserts) {
            try {
                await end(chInsertStream)

            } catch (err) {
                inserts = 0
                throw err
            }
        }
    }
}
async function writeToCkickHouse(table): Promise<void> {
    console.log('writeToCkickHouse')
    const recs: DataPiece[] = await getValues(table);
    await chInsert(recs)
    await redisClient.hDel('values', table)
}
// 
function periodSaving() {
    setTimeout(async () => {
        const tables = await redisClient.hKeys('values')

        for (let table in tables) {
            await writeToCkickHouse(table)
        }
        setTimeout(periodSaving, timeLimit)
    }, timeLimit)
}

async function getValues(table: string): Promise<string | undefined> {
    return JSON.parse(await redisClient.hGet('values', table));
}

app.post(
    '/',
    jsonParser,
    async (req: Request, res: Response) => {
        const { table } = req.body
        const values: string = JSON.stringify(req.body.values);
        let recs;
        const recsStr = await redisClient.hGet('values', table)

        if (recsStr) {
            recs = JSON.parse(recsStr)
        } else {
            recs = []
        }
        recs.push(values)
        const result = await redisClient.hSet('values', table, JSON.stringify(recs));

        if (recs.length >= maxLength) {
            await writeToCkickHouse(table)
        }
        res.json(result);
    }
);

app.get(
    '/:listname',
    async (req: Request, res: Response) => {
        const list = await getValues('example1');
        console.log(list);
        res.send(list);
    }
)

app.listen(httpPort, () => {
    console.log(`App listening on port ${httpPort}`);
});
periodSaving()
