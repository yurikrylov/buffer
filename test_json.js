const data = {
    "table": "chbuffer.test",
    "values": [
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:01",
        "uid": "563de27a-c481-4f5c-831e-467f579a2a15",
        "url": "http://test.com",
        "count": 10
      },
      {
        "date": "2019-01-01",
        "time": "2019-01-01 00:00:02",
        "uid": "dfbdb91f-8760-4fd4-af7b-a788ebc1155b",
        "url": "http://test.com",
        "count": 12
      }
    ]
  }


  const http = require('node:http');

const postData = JSON.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();