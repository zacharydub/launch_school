//#1
//given the following:
// let foo = {
//   bar: 42,
//   qux() {
//     console.log("Pudding");
//   },
// };

// let baz = Object.create(foo);
// baz.qux()
//Which of the following statements about the invocation on line 9 are true? Choose all that apply:
// Your Answer

// The baz object calls a copy of qux that the baz object owns.
// The foo object delegates the invocation of qux to the baz object.
// C - The baz object delegates the invocation of qux to the foo object.
// JavaScript raises a TypeError exception.

//#2
// let abc = { foo: 1, bar: 2 };
// let pqr = Object.create(abc);
// pqr.qux = 3;
// pqr.bar = 4;
//Without running the code, which of the following code snippets will return true?

// A- abc.hasOwnProperty('foo');
// B- abc.hasOwnProperty('bar');
// abc.hasOwnProperty('qux');
// pqr.hasOwnProperty('foo');
// E- pqr.hasOwnProperty('bar');
// F- pqr.hasOwnProperty('qux');

//#3
//getPrototypeOf is a static method of the Object type, so you can't use xyz.getPrototypeOf() to call it. Instead, you must call it as Object.getPrototypeOf(xyz).

//#4 - *****toreview****
//Without running the code, what value does Object.getPrototypeOf({}) return?

// reference to an empty object, e.g., {}. `
// B- reference to the object returned by Object.getPrototypeOf({ a: 1, b: 2 }).
// C- reference to the object returned by Object.prototype.
// D- reference to the default prototype object.

//#5
//Object.keys() always returns a list of an object's "own" properties, but for/in includes the properties of the prototype. 

//#6
//Most objects in JavaScript have an object prototype, but you can use Object.create(null) to create an object that doesn't have a prototype. Creating such bare objects is usually not recommended.

//#7
//If you use braces around the body of an arrow function, you must use an explicit return statement to provide a return value that isn't undefined. You don't need the return if the body does not include braces (one line funcs)

//#8 ***look for tricky/strange syntax***
// Function definitions that begin with the function keyword are function declarations; all other function definitions are function expressions.

//#9 ***be careful - look for syntax mistakes***
//hoisting - can invoke a function defined with a function declaration before the declaration occurs in your code. However must evaluate the any function expression before you can invoke the function.

//#10
//hoisting - JavaScript runs programs in two passes; the first pass performs hoisting, and the second executes the code.

//#11
//Function declarations always require a name for the function, so they can never be anonymous. All arrow functions in JavaScript are anonymous functions.

//#12
//first-class funcs vs higher order funcs(returns a func or takes a func arg)