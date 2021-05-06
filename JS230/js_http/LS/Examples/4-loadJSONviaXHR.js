//we can parse JSON we received using the JSON.parse() method:
let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');

request.addEventListener('load', event => {
  let data = JSON.parse(request.response);
  console.log(data)
  console.log(request.status);
  console.log(data.open_issues);
  // do something with data
});

request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});



request.send();

//----------------------------
//instead of parse(), we can use the request.responseType property to tell thr browser to handle the incoming data it receives as JSON and parse accordingly:
let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', event => {
  // request.response will be the result of parsing the JSON response body or null if the body couldn't be parsed or another erroroccurred.

  let data = request.response;
});
request.send();
//this way lets us avoid extra error-handling code that we may need in the JSON.parse example - here, request.response either contains a value, or it's null, which we can easily check
