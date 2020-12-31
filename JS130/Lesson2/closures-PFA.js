function add(first, second) {
    return first + second;
}

function makeAdder(firstNumber) {
    return function (secondNumber) {
        return add(firstNumber, secondNumber);
    };
}

let addFive = makeAdder(5);
let addTen = makeAdder(10);

console.log(addFive(3));  // 8
console.log(addFive(55)); // 60
console.log(addTen(3));   // 13
console.log(addTen(55));  // 65

//In this program, the makeAdder function creates and returns a new function that, in turn, calls and returns the return value of calling add with two arguments. What's interesting here is that we define the first number when we call makeAdder. We don't provide the second number until later when we call the function that makeAdder returns.

// A function such as makeAdder is said to use partial function application. It applies some of the function's arguments (the add function's first argument here) when called, and applies the remaining arguments when you call the returned function. Partial function application refers to the creation of a function that can call a second function with fewer arguments than the second function expects. The created function appplies the remaining arguments.

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

function schedulerMaker(name) {
    return function (event) {
        return function () {
            console.log(event + " with " + name + ".");
        };
    };
}

var adaScheduler = schedulerMaker("Ada");
var coffeeWithAda = adaScheduler("Coffee");

coffeeWithAda();          // Logs: "Coffee with Ada."
  //using PFA, we can schedule events (call adaScheduler) without having to write the name 'Ada' each time. The function called coffeeWithAda has, in effect, closed over two levels of scope, thus giving it access to both the event and name variables.