
//what will this code log?
var foo = function () {
    console.log("Bye");
};
function foo() {
    console.log("Hello");
}
foo();
//bye - since the func dec with 'hello' gets hoisted above the func expression with 'bye', since the funcs have the same name, the 2nd name wins, which is the one with 'bye' 

////what will this code log?
for (var index = 0; index < 2; index += 1) {
    console.log(foo);
    if (index === 0) {
        var foo = "Hello";
    } else {
        foo = "Bye";
    }
}
console.log(foo);
console.log(index);
//variable foo has function scope - so even though its declared inside the if statement, its available both before the declaration on line 4 and in the code after the for loop. On the first execution of line 2, foo is defined due to hoisting, but its value is still undefined. On the second execution of line 2, foo has been set to "Hello". Finally, when the loop exits, foo is "Bye"
//undefined
//hello
//bye
//2
////hoisted equivalent:
var index;
var foo;
for (index = 0; index < 2; index += 1) {
    console.log(foo);
    if (index === 0) {
        foo = "Hello";
    } else {
        foo = "Bye";
    }
}
console.log(foo);
console.log(index);

//following code doesnt work. fix Without changing the order of the invocation and function definition:
bar();
var bar = function () {
    console.log("foo!");
};
//solution:
bar();
function bar() {
    console.log("foo!");
}

//what will this code log?
var bar = 82;
function foo() {
    var bar = bar - 42;
    console.log(bar);
}
foo();
//NaN 
//'bar' is 'undefined' when we try to subtract from it

//rewrite following code without 'var':
function foo(condition) {
    console.log(bar);
    qux = 0.5772;
    if (condition) {
        var qux = 3.1415;
        console.log(qux);
    } else {
        var bar = 24;
        var xyzzy = function () {
            var qux = 2.7183;
            console.log(qux);
        };
        console.log(qux);
        console.log(xyzzy());
    }
    qux = 42;
    console.log(qux);
}
foo(true);
foo(false);
//solution:
function foo(condition) {
    let bar;
    console.log(bar);
    let qux = 0.5772;
    if (condition) {
        qux = 3.1415;
        console.log(qux);
    } else {
        bar = 24;
        let xyzzy = function () {
            let qux = 2.7183;
            console.log(qux);
        };
        console.log(qux);
        console.log(xyzzy());
    }
    qux = 42;
    console.log(qux);
}
foo(true);
foo(false);

//rewrite code to show hoisting effect:
Pet.prototype.walk = function () {
    console.log(`${this.name} is walking.`);
};
function Pet(name, image) {
    this.name = name;
    this.image = image;
}
class Image {
    constructor(file) {
        this.file = file;
    }
}
var catImage = new Image("cat.png");
var pudding = new Pet("Pudding", catImage);
//solution:
function Pet(name, image) {
    this.name = name;
    this.image = image;
}
var Image;
var catImage;
var pudding;
Pet.prototype.walk = function () {
    console.log(`${this.name} is walking.`);
};
Image = class {
    constructor(file) {
        this.file = file;
    }
};
catImage = new Image("cat.png");
pudding = new Pet("Pudding", catImage);