//1 - Write JavaScript code that makes a GET request to this URL: https://api.github.com/repos/rails/rails.

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails')
request.send()

let request = new XMLHttpRequest();

request.addEventListener('load', event => {
  let xhr = event.target;   // the request is available as event.target if you can't access it from an outer scope.
});
