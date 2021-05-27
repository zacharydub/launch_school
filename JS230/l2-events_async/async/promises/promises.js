//https://javascript.info/promise-basics
//https://javascript.info/promise-chaining
//https://javascript.info/promise-error-handling


//Promise handling is always asynchronous, as all promise actions pass through the internal “promise jobs” queue, also called “microtask queue” (V8 term). SO .then/catch/finally handlers are always called after the current code is finished. If we need to guarantee that a piece of code is executed after .then/catch/finally, we can add it into a chained .then call.

//---------------______________------------------
// PROMISE CHAINING
//promise chaining works, because a call to promise.then returns a promise, so that we can call the next .then on it. When a handler returns a value, it becomes the result of that promise, so the next .then is called with it. The result gets passed through the chain of .then handlers.
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
}).then(function (result) { // (**)
  alert(result); // 1
  return result * 2;
}).then(function (result) { // (***)
  alert(result); // 2
  return result * 2;
}).then(function (result) {
  alert(result); // 4
  return result * 2;
});

//Returning promises allows us to build chains of asynchronous actions. The output is the same as in the previous example: 1 → 2 → 4, but now with 1 second delay between alert calls.
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
}).then(function (result) {
  alert(result); // 1
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function (result) { // (**)
  alert(result); // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function (result) {
  alert(result); // 4
});

//loading scripts after one another in a promise chain:
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scripts are loaded, we can use functions declared there
    one();
    two();
    three();
  });
//Technically, we could add .then directly to each loadScript, like this:
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});
//The above code does the same as the previous: loads 3 scripts in sequence. But it “grows to the right”. So we have the same problem as with callbacks. Sometime this approach works for scope reasons - the most nested callback gets access to all variables script1, script2, script3 - but that’s an exception rather than a rule.

//____________________________________________
// USING FETCH

// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000);
  });
//this code works fine, but what if we wanted to do something only AFTER the avatar has finished showing and gets removed. We need to return and chain a new promise:
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function (resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (*)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
//As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don’t plan to extend the chain now, we may need it later.

//_____________________________________________
//REUSABLE FUNCTIONS:
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}
function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// to use them:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`))
  .catch(error => alert(error.message));
//Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That’s very convenient.  The .catch doesn’t have to be immediate. It may appear after one or maybe several .then. If any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

//if there is an error but we have no .catch method, then the error gets “stuck”. There’s no code to handle it. In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong. What happens when a regular error occurs and is not caught by try..catch? The script dies with a message in the console. A similar thing happens with unhandled promise rejections, when a promise error is not handled at the end of the microtask/event loop queue. The JavaScript engine tracks such rejections, triggers the 'unhandledrejection' event and generates a global error in that case. You can see it in the console if you run the example above. In the browser we can catch such errors using the event unhandledrejection
//Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

//SUMMARY
//.catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.
//HOWEVER, .catch handles only synchronous errors which are thrown while the executor is running, but it wont catch an asynchronous error generated after the executor stops running (i.e setTimeout) - in that case the promise wont handle it. See example below.
//We should place .catch exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
//It’s ok not to use .catch at all, if there’s no way to recover from an error.
//In any case we should have the unhandledrejection event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.

new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert)
//in this code, the .catch wont trigger


//_______________________________________________
//STATIC METHODS of Promise class
/*
1. Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all (the promise returned by Promise.all immediately rejects with that error), and ALL OTHER results are IGNORED.
2. Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
status: "fulfilled" or "rejected"
value (if fulfilled) or reason (if rejected).
3. Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.
4. Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.
5. Promise.resolve(value) – makes a resolved promise with the given value.
6. Promise.reject(error) – makes a rejected promise with the given error.
*/

//Let’s say we want many promises to execute in parallel and wait until all of them are ready. For instance, download several URLs in parallel and process the content once they are all done.

let promise = Promise.all([...promises...]);

//Promise.all takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise. The new promise resolves when all listed promises are settled, and the array of their results becomes its result.
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // each promise contributes an array member and the above code settles after 3 seconds, and then its result is an array [1, 2, 3]
//NOTE:  the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.

//A common trick is to map an array of job data into an array of promises, and then wrap that into Promise.all. For instance, if we have an array of URLs, we can fetch them all like this:

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));
// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));

//if any of the promises reject:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
//the second promise rejects in two seconds which leads to an immediate rejection of Promise.all and .catch executes as the rejection error becomes the outcome of the entire Promise.all.


//_________________________________________________
//PROMISIFICATION

//=the conversion of a function that accepts a callback into a function that returns a promise. Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.


//given a func using callbacks:
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
// usage:
// loadScript('path/script.js', (err, script) => {...})

//if we PROMISIFY it:
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};
// usage:
// loadScriptPromise('path/script.js').then(...)

//SO we pass it only src (no callback) and get a promise in return, that resolves with script when the load is successful, and rejects with the error otherwise.

//In practice we may need to promisify more than one function, so it makes sense to use a helper.We’ll call it promisify(f): it accepts a to-promisify function f and returns a wrapper function.

function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
      args.push(callback); // append our custom callback to the end of f arguments
      f.call(this, ...args); // call the original function
    });
  };
}
// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
//The code may look a bit complex, but it’s essentially the same that we wrote above, while promisifying loadScript function. A call to promisify(f) returns a wrapper around f (*). That wrapper returns a promise and forwards the call to the original f, tracking the result in the custom callback (**). Here, promisify assumes that the original function expects a callback with exactly two arguments (err, result). That’s what we encounter most often. Then our custom callback is in exactly the right format, and promisify works great for such a case.
//But what if the original f expects a callback with more arguments callback(err, res1, res2, ...)? We can improve our helper. Let’s make a more advanced version of promisify:
//When called as promisify(f) it should work similar to the version above.
//When called as promisify(f, true), it should return the promise that resolves with the array of callback results. That’s exactly for callbacks with many arguments.

// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }
      args.push(callback);
      f.call(this, ...args);
    });
  };
}
// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
//It’s essentially the same as above, but resolve is called with only one or all arguments depending on whether manyArgs is truthy.
//For more exotic callback formats, like those without err at all: callback(result), we can promisify such functions manually without using the helper.
//There are also modules with a bit more flexible promisification functions, e.g. es6-promisify. In Node.js, there’s a built-in util.promisify function for that.

//NOTE:
//Promisification is a great approach, especially when you use async/await (see the next chapter), but not a total replacement for callbacks Remember, a promise may have only one result, but a callback may technically be called many times. So promisification is only meant for functions that call the callback once. Further calls will be ignored.

//_______________________________________________
// ASYNC & AWAIT

//The word ASYNC before a function means one simple thing: a function always returns a promise (and we can use the AWAIT keyword inside it). Other values are wrapped in a resolved promise automatically
//For instance, this function returns a resolved promise with the result of 1
async function f() {
  return 1;
}
f().then(alert); // 1
//that is equivalent to returning a promise explicitly:
async function f() {
  return Promise.resolve(1);
}
f().then(alert); // 1


//AWAIT makes JavaScript wait until that promise settles. Then:
//if error the exception is generated (as if we called 'throw error')
//else return its result.
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });
  let result = await promise; // wait until the promise resolves (*)
  alert(result); // "done!"
}
f();
//The function execution “pauses” at the line (*) and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.

//rewriting the reusable funcs (showAvatar) we wrote earlier using async/await:
async function showAvatar() {
  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();
  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);
  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();
  return githubUser;
}
showAvatar();


//can’t use await in top-level code But we can wrap it into an anonymous async function:

(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();

//ERROR HANDLING:
async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}
f();
//In the case of an error, the control jumps to the catch block.
//We can also wrap multiple lines:
async function f() {
  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}
f();

//If we don’t have try..catch, then the promise generated by the call of the async function f() becomes rejected. We can append .catch to handle it:

async function f() {
  let response = await fetch('http://no-such-url');
}
// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
//If we forget to add .catch there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global unhandledrejection event handler

//ASYNC/AWAIT vs. PROMISE.then/catch
//When we use async/await, we rarely need .then, because await handles the waiting for us. And we can use a regular try..catch instead of .catch (usually more convenient). But at the top level of the code, when we’re outside any async function, we’re syntactically unable to use await, so it’s a normal practice to add .then/catch to handle the final result or falling-through error, like in the line (*) of the example above.

//Promise.all works well with async/await when we are waiting for many tasks simultaneously.


//1
//Given this func using .then/catch
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}
loadJson('no-such-user.json')
  .catch(alert)

//rewritten using async/awair
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }
  throw new Error(response.status);
}
loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)

//2
//Rewrite the below using async/await instead of .then/catch. And get rid of the recursion in favour of a loop in demoGithubUser:
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}
// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}
demoGithubUser();
//
//
//SOLUTION:
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}
// Ask for a user name until github returns a valid user
async function demoGithubUser() {
  let user;
  while (true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop continues after the alert
        alert("No such user, please reenter.");
      } else {
        // unknown error, rethrow
        throw err;
      }
    }
  }
  alert(`Full name: ${user.name}.`);
  return user;
}
demoGithubUser();
//Just replace .catch with try..catch inside demoGithubUser and add async/await where needed



//3 - call async from non-async
//We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}
function f() {
  // ...what should you write here? we need to call async wait() and wait to get 10. We can't use "await"
}

//
//
//SOLUTION
function f() {
  // shows 10 after 1 second
  wait().then(result => alert(result));
}
//Just treat async call as a romise and attach .then to it
