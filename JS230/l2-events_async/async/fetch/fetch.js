//https://javascript.info/fetch

let promise = fetch(url, [options])
//Without options, this is a simple GET request, downloading the contents of the url. The browser starts the request right away and returns a promise that the calling code should use to get the result.


//Getting a response is usually a two-stage process:
//1- the promise, returned by fetch, resolves with an object of the built-in Response class as soon as the server responds with headers.At this stage we can check HTTP status to see whether it is successful or not and check headers (response props: 'status' and 'ok' and 'headers') , but don’t have the body yet.
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}

//2- we access the body according to format
response.text() // read the response and return as text
response.json() //parse the response as JSON
response.formData() // return the response as FormData object (explained in the next chapter)
//also
//.blob (binary data with type)
//.arrayBuffer(low-level binary data proxy)


//using async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);
let commits = await response.json(); // read response body and parse as JSON
alert(commits[0].author.login);

//using promises
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));

//NOTE:  Can choose only one body-reading method. If we’ve already got the response with response.text(), then response.json() won’t work, as the body content has already been processed


//RESPONSE/REQUEST HEADERS

//RESPONSE HEADERS
// are available in a Map-like headers object in response.headers
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
// iterate over all headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
//REQEUST HEADERS
//set using the headers option
let response = fetch(protectedUrl, {
  headers: { //note there's a list of forbidden HTTP headers controlled by the browser which we cant set
    Authentication: 'secret'
  }
});

//POST REQUEST
//json format is used most of the time (less frequent formData/URLSearchParams)
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  //if the request body is a string, then Content-Type header is set to text/plain;charset=UTF-8 by default.
  body: JSON.stringify(user)

});

let result = await response.json();
alert(result.message);

//submit binary data using Blob/BufferSource to send an image
//
//


//Tasks
async function getUsers(names) {
  let jobs = [];

  for (let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }
  let results = await Promise.all(jobs);
  return results;
}
// .then call is attached directly to fetch, so that when we have the response, it doesn’t wait for other fetches, but starts to read .json() immediately. If we used await Promise.all(names.map(name => fetch(...))), and call .json() on the results, then it would wait for all fetches to respond. By adding .json() directly to each fetch, we ensure that individual fetches start reading data as JSON without waiting for each other.That’s an example of how low-level Promise API can still be useful even if we mainly use async/await.


//https://javascript.info/formdata
