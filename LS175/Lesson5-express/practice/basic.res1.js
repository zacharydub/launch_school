const HTTP = require('http');
const PORT = 1999;
const URL = require('url').URL;

function getParams(path) {
  let myparams = new URL(path, `http://localhost:${PORT}`);
  return myparams.searchParams;
}
function some(paramsObject) {
  let first = paramsObject.get('param1');
  let second = paramsObject.get('param2');

  let body = '';
  body += first.toUpperCase() + second.toUpperCase();

  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let path = req.url;
  let method = req.method;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    console.log(path);
    console.log(method);
    // let params = getParams(path);
    let content = some(getParams(path))
    res.setHeader('Content-Type', 'text/plain');
    res.write('hello\n');
    // res.write(`${params.get('param1')}\n`);
    // res.write(`${params.get('param2')}\n`);
    res.write(`${content}\n`)
    res.write(`${method}\n`);
    res.write(path);
    res.end();
  }

})

SERVER.listen(PORT, () => {
  console.log('listening to yours truly on port 1999 :)');
})