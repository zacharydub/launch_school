const HTTP = require('http');
const PORT = 3000;

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url; // path+query components

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); // This method can be called multiple times, once for each header to be set; an alternative is to use the writeHead method which can take an object, containing multiple name-value pairs, as an argument. If using writeHead, you would also set the status code using that method rather than statusCode.
    res.write(`${method} ${path}\n`);//can be called multiple times
    res.end(); // must be called for each response
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
