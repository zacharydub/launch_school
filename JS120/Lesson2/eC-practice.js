// #1
function func() {
  return this;
}

let context = func();

console.log(context); // this returns the global object ('global' on Node or 'window' on browser)
// since line 5 calls func as a function, the implicit context for func is the global object, so it returns the global object.

// #2
let obj = {
  func: function () {
    return this;
  },
};

let context = obj.func();

console.log(context); // { func: [Function: func] }
//Unlike problem 1, this code outputs the object 'obj' since it invokes 'func' as a method. The output looks like this in Node:
//As a method invocation, it receives an implicit eC that refers to the object used to invoke it.

// #3
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = { message: 'Hello from the function scope!', };

foo.deliverMessage = deliverMessage;
foo.deliverMessage();
//Hello from the global scope! - returned by the function call on line 5 - since this is a function invocation, the implicit function eC is the global object; the global property message, which is often called a "global variable", is referenced.

//Hello from the function scope! - returned by last line's method invocation - since the implicit function eC for a method invocation is the calling object, this resolves to foo.message

// #5
// for the following code, use 'call' to invoke the add method but with 'foo' as eC
let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add: function () {
    return this.a + this.b;
  },
};
// my answer: bar.add.call(foo) - will return 3
//Since we invoke call on bar.add with foo as the explicit context, the add method uses foo.a and foo.b to determine the results, not bar.a and bar.b. Thus, the return value is 3.