//#2
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);// this logs nothing. Unlike call and apply, bind doesn't invoke the function used to call it. Instead, it returns a new function that is permanently bound to the context argument.

//#3
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo()); // NaN - the function 'foo' looks for variables 'a' and 'b' since it is invoked as a function and 'this' is bound to the global object. Both 'this.a' and 'this.b' evaluate to 'undefined', resulting in a 'NaN' value.
console.log(bar()); // 5 - 'bar', however, is explicitly bound to 'obj' on line 12, and, as a result, references that object's 'a' and 'b' properties when it is invoked.

//#4
let positivity = {
  message: 'JavaScript makes sense!',
};
let negativity = {
  message: 'JavaScript makes no sense!',
};
function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);
negativity.logMessage = bar;
negativity.logMessage(); // JavaScript makes sense! - Since 'bar' is bound to 'positivity' as the return value of the bind invocation on line 38, 'positivity's' property 'message' is logged by the function call on the last line, despite the fact that the function is invoked as a method on the 'negativity' object.

//#5
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);// Amazebulous! - Once a function's context get bound using 'bind', its context can't be changed, even with 'call' and 'apply'. In keeping with this, the last line of our code outputs "Amazebulous!", because the function 'bar's' context has been permanently bound to 'obj'