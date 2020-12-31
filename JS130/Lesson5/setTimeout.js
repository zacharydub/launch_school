//1
// Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, and so on.

// function delayLog() {
//     for (let i = 1; i <= 10; i++) {
//         setTimeout(() => { console.log(i) }, i * 1000)
//     }
// }
// delayLog()

//vs:
// function delayLog1() {
//     for (let delay = 1; delay <= 10; delay += 1) {
//         setTimeout(() => console.log(delay), 1000);
//     }
// }

// delayLog1();
//how would we write this so that the delay after aeach loggin is the current number - i.e 6 only logs 5 seconds after 5 logs

//vs:
function delayLog1() {
    for (var delay = 1; delay <= 10; delay += 1) {
        setTimeout(() => console.log(delay), 1000);
    }
}
delayLog1();
//The issue here is that a var declaration has function scope, so the loop uses the same delay variable with each iteration. Due to closure, each invocation of the callback function sees the current state of the delay variable. Since the callback doesn't get called until long after the loop finishes, it gets the final value of delay, e.g., 11.
// Since let has block scope, each iteration in solution to the previous problem forms a closure with a different variable. Thus, each callback's closure encloses a different delay variable.
//another example of var vs. let -> https://www.freecodecamp.org/news/lets-learn-javascript-closures-66feb44f6a44/

//3 In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

setTimeout(function () {     // 1
    console.log('Once');    // 5
}, 1000);

setTimeout(function () {   // 2
    console.log('upon');    // 7
}, 3000);

setTimeout(function () {   // 3
    console.log('a');       // 6
}, 2000);

setTimeout(function () {   // 4
    console.log('time');    // 8
}, 4000);

//4 In what sequence does the JavaScript runtime run the functions q(), d(), n(), z(), s(), f(), and g() in the following code?

setTimeout(function () {
    setTimeout(function () {
        q(); //7
    }, 15);

    d(); //3

    setTimeout(function () {
        n();
    }, 5); //5

    z(); //4
}, 10);

setTimeout(function () {
    s(); //6
}, 20);

setTimeout(function () {
    f();  //2
});

g();  // 1

// 5 Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. It should wait for the indicated period, then invoke the callback function.

function afterNSeconds(cb, time) {
    setTimeout(cb, time * 1000)
}
