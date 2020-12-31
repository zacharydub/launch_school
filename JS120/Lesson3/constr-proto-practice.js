// #1
// let RECTANGLE = {
//   area: function () {
//     return this.width * this.height;
//   },
//   perimeter: function () {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);
//The value of this within the RECTANGLE.area and RECTANGLE.perimeter methods gets set to the RECTANGLE object when they are called. Since RECTANGLE doesn't define width and height properties, the property accesses both return undefined. Since mathematical operations on undefined produce a valid of NaN, the return value of the methods is NaN.

// #2
//#1 above is fixed by doing:
// this.area = RECTANGLE.area.call(this);
// this.perimeter = RECTANGLE.perimeter.call(this);

// #3
//Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:
// let a = new Circle(3);
// let b = new Circle(4);


// function Circle(radius) {
//   this.radius = radius;
//   // Circle.prototype.area = function () {
//   //   return Math.PI * (this.radius ** 2)
//   // }
// }
// // Circle.prototype.area = function () {
// //   return 3.14 * (this.radius ** 2)
// // }
// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27
// console.log(a.hasOwnProperty('area')); // => false

// #4
//what does the following log
// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// console.log(ninja.swingSword());

//true as expected. Even though we define the swingSword method on the prototype after we create the ninja, all objects created by the Ninja constructor share the same prototype object. Thus, when we define swingSword, it immediately becomes available to the ninja object.
//**however if we put the console.log before the swingsword definition we will get an error since swingsword  hasn't been defined as a function yet

//#5
// //what will the following log:
// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function () {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

//results in an error since ninja.swingSword is NOT a function. We're reassigning Ninja.prototype to an entirely new object instead of mutating the original prototype object as we did in the previosu example. The prototype for the ninja object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the swingSword method in the prototype chain of ninja.

// #6  *** to review***

//fill in the code
// function Ninja() {
//   this.swung = false;
// }
// Ninja.prototype.swing = function () {
//   this.swung = true;
//   return this;
// }
// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

//see lines 89-91. I got the first 2 lines, but need to understand the 'return this'
//"This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, ninjaA and ninjaB)."

// #7 ***to review***
// let ninjaA;

// {
//   const Ninja = function () {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// // create a `ninjaB` object here; don't change anything else, so that:
// ninjaA.constructor === ninjaB.constructor // => true

//hint:The value assigned to ninjaA is an object created by a constructor function. As such, this object has a constructor property that points back to its constructor.
//solution:
// let ninjaB = new ninjaA.constructor();

// //if we tried:
// let ninjaB = Object.create(ninjaA);
//there is a flaw: it puts the swung property in the prototype object instead of in the ninjaB object where it belongs. Thus, ninjaA and ninjaB are somewhat different objects

//****to review*** how 'create' puts inherited methods in prototype prop rather than directly on newly created object

//#8 ****toreview***
//Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:
// function User(first, last) {
//   // ...
// }

// let name = 'Jane Doe';
// let user1 = new User('John', 'Doe');
// let user2 = User('John', 'Doe');

// console.log(name);         // => Jane Doe
// console.log(user1.name);   // => John Doe
// console.log(user2.name);   // => John Doe

//solution:
// function User(first, last) {
//   if (!(this instanceof User)) {
//     return new User(first, last);
//   }

//   this.name = first + ' ' + last;
// }

// //Constructor functions built this way are called scope-safe constructors. Most, but not all, of JavaScript's built-in constructors, such as Object, RegExp, and Array, are scope-safe. String is not:
// new Object();          // Object {}
// Object();              // Object {}

// new Array(1, 2, 3);    // [1, 2, 3]
// Array(1, 2, 3);        // [1, 2, 3]

// new String("abc");     // [String: 'abc']
// String("abc");         // 'abc'

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }
}
let rec = new Rectangle(10, 5);
// console.log(typeof Rectangle);         // function
// console.log(rec instanceof Rectangle); // true
// console.log(rec.constructor);          // [class Rectangle]
// console.log(rec.getArea());            // 50
console.log(Rectangle.prototype)
console.log(rec.__proto__)
console.log(rec.__proto__ === Rectangle.prototype)