# ClickHouse-Buffer

Redis buffer for streaming data to ClickHouse writen on Node.js

## Requirements

- Node >= 18.0.0
- Git
- Redis
- ClickHouse

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/yurikrylov/buffer.git
cd buffer

npm install
```

```bash
# Start api (http cluster) + loader (worker_thread)
npm run start

# Also you can start processes separately
# Start api (http single)
npm run http
# Start loader
npm run loader
```

## Config

For settings buffer use environment variables:

| Name                | Default      | Description                                                                                                               |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| HTTP_PORT           | 3000         | Port for API (http server)                                                                                                |
| REDIS_HOST          | 127.0.0.1    | Host for redis instance                                                                                                   |
| REDIS_PORT          | 6379         | Port for redis instance                                                                                                   |
| CLICKHOUSE_HOST     | 127.0.0.1    | Host for clickhouse instance                                                                                              |
| CLICKHOUSE_PORT     | 8123         | Port for clickhouse instance                                                                                              |
| CLICKHOUSE_USER     | default      | User for clickhouse instance                                                                                              |
| CLICKHOUSE_PASSWORD |              | Password for clickhouse instance                                                                                          |



## Write data to buffer

All you need to do is send a post request with the data to be inserted in a simple JSON format:

```bash
curl -X POST -d '<json>' http://localhost:3000
```

```json
{
  "table": "tracker.hits",
  "values": [
  {
      "date": "2019-01-01",
      "time": "2019-01-01 00:00:01",
      "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
      "url": "http://test.com",
      "count": 10
    }
  ]
}
```

For this example loader create insert query like:

```sql
INSERT INTO tracker.hits(date, time, url) FORMAT TabSeparated

2019-01-01\t2019-01-01 00:00:01\thttp://test.com\n
2019-01-01\t2019-01-01 00:00:02\thttp://test.com/page1\n
```

