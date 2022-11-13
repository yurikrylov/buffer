import { createClient } from 'redis';
const redisClient = createClient({ url: 'redis://172.22.92.46:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect()
redisClient.hGet('values', 'example1')
