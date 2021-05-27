//simplify createServer function further (separating the app logic vs HTTP req/res handling) by using routing engine. This way, the createServer() callback would then essentially just become an interface for HTTP requests and responses that is separate from the logic of our application; it would be responsible for initializing the request and response objects, but would not need to know anything about what the application then does with those objects.

//We can think of a route as being the combination of a HTTP request method and a path, and the request handler that gets called (and contains the application logic) when that combination is matched. Thus, routing in this context is matching the incoming request to the appropriate request handler using the method and path. That's essentially what we've been doing with our conditional statement, but we now want to extract that functionality to its own component.


//We no longer require the path and fs modules, since the functionality they provided is now abstracted to serve-static
const HTTP = require('http');
const URL = require('url').URL;
const QUERYSTRING = require('querystring');
const ROUTER = require('router'); // routing engine. Needs to be initialized by invocation -> ROUTER(). We can then invoke the function returned by this initialization - "router(req, res, FINALHANDLER(req, res));" - to search for a matching route and invoke the associated handler
const FINALHANDLER = require('finalhandler'); //Returns function to be invoked as the final step for the given req and res. We need this final step because our router() function acts as middleware within our application and the FINALHANDLER call is used to terminate this middleware chain
const SERVESTATIC = require('serve-static'); // Create(s) a new middleware function to serve files from within a given root directory. Using this middleware will abstract away the logic in the createServer() callback that interacts with the file system in order to serve the static assets.
const PORT = 3000;
const HANDLEBARS = require('handlebars');
const APR = 5;

const LOAN_OFFER_SOURCE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Loan Calculator</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
  </head>
  <body>
    <article>
      <h1>Loan Calculator - Routing Engine</h1>
      <table>
        <tbody>
          <tr>
            <th>Amount:</th>
            <td>
              <a href='/loan-offer?amount={{amountDecrement}}&duration={{duration}}'>- $100</a>
            </td>
            <td>$ {{amount}}</td>
            <td>
              <a href='/loan-offer?amount={{amountIncrement}}&duration={{duration}}'>+ $100</a>
            </td>
          </tr>
          <tr>
            <th>Duration:</th>
            <td>
              <a href='/loan-offer?amount={{amount}}&duration={{durationDecrement}}'>- 1 year</a>
            </td>
            <td>{{duration}} years</td>
            <td>
              <a href='/loan-offer?amount={{amount}}&duration={{durationIncrement}}'>+ 1 year</a>
            </td>
          </tr>
          <tr>
            <th>APR:</th>
            <td colspan='3'>{{apr}}%</td>
          </tr>
          <tr>
            <th>Monthly payment:</th>
            <td colspan='3'>$ {{payment}}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </body>
</html>
`;

const LOAN_FORM_SOURCE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Loan Calculator</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
  </head>
  <body>
    <article>
      <h1>Loan Calculator - Routing Engine</h1>
      <form action="/loan-offer" method="post">
        <p>All loans are offered at an APR of {{apr}}%.</p>
        <label for="amount">How much do you want to borrow (in dollars)?</label>
        <input type="number" name="amount" value="">
        <label for="amount">How much time do you want to pay back your loan?</label>
        <input type="number" name="duration" value="">
        <input type="submit" name="" value="Get loan offer!">
      </form>
    </article>
  </body>
</html>
`;

const LOAN_OFFER_TEMPLATE = HANDLEBARS.compile(LOAN_OFFER_SOURCE);
const LOAN_FORM_TEMPLATE = HANDLEBARS.compile(LOAN_FORM_SOURCE);

function render(template, data) {
  let html = template(data);
  return html;
}

function parseFormData(request, callback) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let data = QUERYSTRING.parse(body);
    data.amount = Number(data.amount);
    data.duration = Number(data.duration);
    callback(data);
  });
};

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  let searchParams = myURL.searchParams;
  let data = {};
  data.amount = Number(searchParams.get('amount'));
  data.duration = Number(searchParams.get('duration'));

  return data;
};

function getPathname(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.pathname;
};

function calculateLoan(amount, duration, apr) {
  let annualInterestRate = apr / 100;
  let monthlyInterestRate = annualInterestRate / 12;
  let months = Number(duration) * 12;
  let payment = amount *
    (monthlyInterestRate /
      (1 - Math.pow((1 + monthlyInterestRate), (-months))));

  return payment.toFixed(2);
};

function createLoanOffer(data) {
  data.amountIncrement = data.amount + 100;
  data.amountDecrement = data.amount - 100;
  data.durationIncrement = data.duration + 1;
  data.durationDecrement = data.duration - 1;
  data.apr = APR;
  data.payment = calculateLoan(data.amount, data.duration, APR);

  return data;
};

let router = ROUTER();
router.use(SERVESTATIC('public')); //  add serve-static to our middleware chain by calling use() on our router instance. This will cause router to pass any req and res objects it receives to the SERVESTATIC middleware. SERVESTATIC will check for the existence of a file defined by req.url. The 'public' string passed to the SERVESTATIC function identifies the root directory within which to search. If a file is found, our server will send its contents in the HTTP response, if not then Node moves on to the next middleware, which is the router function itself

router.get('/', function (req, res) {
  let content = render(LOAN_FORM_TEMPLATE, { apr: APR });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(`${content}\n`);
  res.end();
});

router.get('/loan-offer', function (req, res) {
  let data = createLoanOffer(getParams(req.url));
  let content = render(LOAN_OFFER_TEMPLATE, data);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(`${content}\n`);
  res.end();
});

router.post('/loan-offer', function (req, res) {
  parseFormData(req, parsedData => {
    let data = createLoanOffer(parsedData);
    let content = render(LOAN_OFFER_TEMPLATE, data);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`${content}\n`);
    res.end();
  });
});

router.get('*', function (req, res) {
  res.statusCode = 404;
  res.end();
});

const SERVER = HTTP.createServer((req, res) => {
  //By using router and serve-static, we've abstracted out all of the logic for handling requests for pre-defined routes and static assets. Because of this, our Node SERVER can just focus on the job of listening for connections and managing req and res objects
  router(req, res, FINALHANDLER(req, res));
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


//In order to explore abstractions we've worked directly with Node's createServer(), and with packages such as serve-static and router. Generally, when building an application, you wouldn't bolt together individual components such as these. A more typical approach would be to use an application framework. Frameworks abstract the functionality of these components even further in order to provide a simpler and more consistent interface

//The various tools, libraries, and frameworks used in developing networked applications are essentially layers of abstraction on top of the what's happening at the base level, which is the interaction of application logic with HTTP requests and responses
