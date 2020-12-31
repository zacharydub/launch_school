//what will the code log:
let counter = 0;
function makeCounter() {
    return function () {
        counter += 1;
        return counter;
    }
}
let incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
//1,2,3,4 - since counter is declared in the global scope, its value gets set to 0 only once, and closure ensures that the function returned by makeCounter contains an envelope with a pointer to that variable

//now what will the code log:
function makeCounter() {
    return function () {
        let counter = 0;
        counter += 1;
        return counter;
    }
}
let incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
//All four console.log calls print 1. Since counter is declared and initialized in the function returned by makeCounter, closure plays no part in its execution. Instead, counter gets created and initialized to 0 each time we call incrementCounter.

//now what will code log:
function makeCounter() {
    let counter = 0;
    return function () {
        counter += 1;
        return counter;
    }
}
let incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
incrementCounter = makeCounter();
console.log(incrementCounter());
console.log(incrementCounter());
//1,2 and 1,2 - the two invocations of makeCounter each return a function that has access to a local variable named counter, but, in both cases, the variable is distinct. See the next problem to understand why.

//now what will code log:
function makeCounter() {
    let counter = 0
    return function () {
        counter += 1;
        return counter;
    }
}

let incrementCounter1 = makeCounter();
let incrementCounter2 = makeCounter();
console.log(incrementCounter1());
console.log(incrementCounter1());
console.log(incrementCounter2());
console.log(incrementCounter2());
//1,2 and 1,2 - demonstrates that each returned function has an independent copy of the counter variable in their envelope. They are, in fact, two different variables entirely; they just have the same name. When we increment the counter variable from incrementCounter1's envelope, it has no effect on the one in incrementCounter2's envelope


//Write a function named makeMultipleLister that you can call with a number as an argument. The function should return a new function that, when invoked, logs every positive integer multiple of that number less than 100. 
let lister = makeMultipleLister(17);
lister();
//solution:
function makeMultipleLister(number) {
    return () => {
        for (let multiple = number; multiple < 100; multiple += number) {
            console.log(multiple);
        }
    };
}

//Write a program that uses two functions, add and subtract, to manipulate a running total. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console.
add(1);       // 1
add(42);      // 43
subtract(39); // 4
add(6);       // 10
//solution:
let total = 0;

function add(number) {
    total += number;
    console.log(total);
}

function subtract(number) {
    total -= number;
    console.log(total);
}

//what will the code log?
function foo(start) {
    let prod = start;
    return function (factor) {
        prod *= factor;
        return prod;
    };
}
let bar = foo(2);
let result = bar(3);
result += bar(4); // 6+24 = 30
result += bar(5); //30+120 = 150
console.log(result);
//   On line 9, we create a function that we assign to the bar variable. This function takes a single argument, multiplies it with a variable named prod, and returns the result. Even though prod is out of scope when we call bar, closure lets bar retain access to prod.
// On line 10, we call the returned function with a value of 3. Due to closure, the function has access to prod, which is currently set to 2. It multiplies total by 3, and returns the new value of total, i.e., 6. We assign the return value to result.
// On line 11, we again call the returned function, but this time with an argument of 4. Since we set prod to 6 in the previous call, we end up multiplying 6 by 4, and setting prod to the result, 24. We then return that value and add it to the previous result, 6, which produces a result of 30.
// Line 12 is similar. This time, we multiply prod (whose value is 24) by 5, and set prod to the result, 120. We then return 120 and add it to the previous result value of 30, which produces the final value of 150.

//Write a function named later that takes two arguments: a function and an argument for that function. The return value should be a new function that calls the input function with the provided argument
const logger = message => console.log(message);
let logWarning = later(logger, "The system is shutting down!");
logWarning(); // The system is shutting down!
//solution:
function later(func, arg) {
    return function () {
        func(arg)
    }
}
//we use partial function application to create a new function that doesn't need a message every time we call it.


//Write a function named later2 that takes two arguments: a function and an argument for that function. The return value should be a new function that also takes an argument. The new function should call the input function with the argument provided to later2 and the argument provided to the returned function
const notify = function (message, when) {
    console.log(`${message} in ${when} minutes!`);
};

let shutdownWarning = later2(notify, "The system is shutting down");
shutdownWarning(30); // The system is shutting down in 30 minutes!
//solution:
function later2(func, arg) {
    return function (arg2) {
        func(arg, arg2)
    }
}

//The built-in Function.prototype.bind method performs partial function application by allowing you to specify some of the function's arguments when you invoke bind. It also permanently binds the new function to a specific execution context with its first argument. That binding is, in a sense, also an example of partial function application. Here, the "argument" we're applying to the function is the function's execution context.
// Write a function that emulates the context binding aspect of bind. That is, your version of bind should merely call the function with the desired context; it doesn't need to pass any arguments to the function.
"use strict";
let obj = {};
let boundFunc = bind(obj, function () {
    this.foo = "bar";
});
boundFunc();
console.log(obj); // { foo: 'bar' }
//solution:
function bind(context, func) {
    return () => func.call(context);
}