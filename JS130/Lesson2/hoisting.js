//https://medium.com/launch-school/javascript-es6-var-let-const-9645f543f7cb


//hoisting with 'let'
function myFunc() {
    if (true) {
        let a = 1;
        console.log(a); // 1
        console.log(b); // ReferenceError: Cannot access 'b before initialization - temporal dead zone
        console.log(c); // ReferenceError: Cannot access 'c' before initialization - temporal dead zone
        let b = 2;
    }
    console.log(a); // ReferenceError: a is not defined - shows that LETs are block scoped
    console.log(b); // ReferenceError: b is not defined - shows that LETs are block scoped
    console.log(c); // ReferenceError: Cannot access 'c' before initialization - temporal dead zone
    let c = 3;
}
myFunc();
//let is hoisted to top of block scope - for variables 'a' and 'b' its the 'if' statement, while for varialbe 'c' its block scope is the entire function myFunc

//hoisting with var
function otherFunc() {
    if (true) {
        var a = 1;
        console.log(a); // 1
        console.log(b); // undefined - no temporal dead zone
        console.log(c); // undefined - ""
        var b = 2;
    }
    console.log(a); // 1 - shows that VARs are function scoped
    console.log(b); // 2 - shows that VARs are function scoped
    console.log(c); // undefined - ""
    var c = 3;
}
otherFunc();


//hoisting quick examples:
//let:
console.log(bar); // ReferenceError: Cannot access 'bar' before initialization
let bar = 42;

//var:
console.log(bar); // undefined
var bar = 42;


//function hoisting:
foo(); // qux
function foo() {
    bar();
}
function bar() {
    console.log("qux");
}


//functions+variables:
// original code:
var bar = 3;
foo(); // 3
function foo() {
    console.log(bar);
}
// hoisted code:
function foo() {
    console.log(bar);
};
var bar;
bar = 3;
foo(); // 3

