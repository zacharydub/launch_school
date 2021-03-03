////http module
const HTTP = require('http');
const SERVER = HTTP.createServer((req, res) => {
});

SERVER.listen(3000, () => {
  console.log('Server listening on port 3000');
})
//navigate to http://localhost:3000 and you will see your console log 'Server listening on port 3000'

////url module
const URL = require('url').URL;
const myURL = new URL('/my/path?color=red', 'http://some-website');
console.log(myURL.searchParams); // URLSearchParams { 'color' => 'red' }
console.log(myURL.searchParams.get('color')); // red
console.log(myURL.pathname); // /my/path

////handlebars template engine
const HANDLEBARS = require('handlebars');
const template1 = HANDLEBARS.compile(templateSource);
let content = template1(dataObj);

////fs module
const FS = require('fs');
//within createServer:
FS.readFile(`./cssFolder${pathname}`, (err, data) => {
  if (data) {
    res.statusCode = 200;
    res.write(`${data}\n`);
    res.end();
  } else {
    // check other pre-defined resource paths i.e. / and /loan-offer
  }
});

////path module
const PATH = require('path');
let fileExtension = PATH.extname(path) //or can use pathname from URL module


////bringing it all together so far including static files:
const HTTP = require('http');
const URL = require('url').URL;
const PATH = require('path');
const FS = require('fs');
const MIME_TYPES = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
};

function getPathname(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.pathname;
};

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  let pathname = getPathname(path);
  let fileExtension = PATH.extname(pathname); //or can use the 'path' variable

  FS.readFile(`./public/${pathname}`, (err, data) => {
    if (data) {
      res.statusCode = 200;
      res.setHeader('Content-Type', `${MIME_TYPES[fileExtension]}`);
      res.write(`${data}\n`);
      res.end();
    } else {
      if (pathname === '/') {
        let content = render(LOAN_FORM_TEMPLATE, { apr: APR });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`${content}\n`);
        res.end();
      } else if (pathname === '/loan-offer') {
        let data = createLoanOffer(getParams(path));
        let content = render(LOAN_OFFER_TEMPLATE, data);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`${content}\n`);
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }
    }
  })
})

SERVER.listen(3000, () => {
  console.log('Server listening on port 3000');
})


//routing engine & finalhandler - enables separation of concerns

//serve-static - abstracts away 'fs' and 'path' modules