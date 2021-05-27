


// //subtyping with constructors and prototypes
function Garment4(type, size, count) {
  this.type = type;
  this.size = size;
  this.count = count;

}
Garment4.prototype.method1 = function () {
  console.log('method')
}
Garment4.prototype.method2 = function () {
  return 'override'
}

function Shirt(color, type, size, count) {
  Garment4.call(this, type, size, count)
  this.color = color;
}

//using the Garment constructor to set the props already defined there by way of invoking the Garment constructor with call to explicitly set the exC to the conext of Square
//all objects created by the Shirt constructor inherit from Shirt.prototype, and that's where we store the methods we want shared by all shirt objects.

Shirt.prototype = Object.create(Garment4.prototype)
Shirt.prototype.constructor = Shirt // after we reassign Shirt.prototype to a new object that inherits from Garment.prototype, and the contstructor prop of Garment.prototype references Garment, so Shirt.prototype.constructor now points to Garment as well, so we need to reset that constructor prop to point to Shirt.
//Shirt is a sub-type of Garment, or Garment is a super-type of Shirt

Shirt.prototype.method2 = function () {
  return 'override2'
}

// let tshirt = new Shirt('red', 'shirt', 'xl', '40')
// // console.log(tshirt.size)
// // console.log(tshirt.hasOwnProperty('color'))
// // console.log(tshirt.hasOwnProperty('size'))
// // console.log(tshirt.hasOwnProperty('method1'))
// console.log(tshirt.color)
// // console.log(tshirt.method2())

//with classes
class Garment5 {
  constructor(type, size, count) {
    this.type = type;
    this.size = size;
    this.count = count;
  }
  sell(msg) {
    console.log('sell it ' + msg)
  }
  toString() {
    return `Garment ${this.type}`
  }
}

class Shirt2 extends Garment5 {
  constructor(type, size, count, sleeves) {
    super(type, size, count);
    this.sleeves = sleeves;
  }
  toString() {
    return `Shirt ${this.sleeves}`
  }
  sold() {
    this.sell('sooold')
  }
}
//constructor method in subtype class requires arguments that differ from constructor method in supertype class, so we must define a constructor method for subtype, and that method must be sure to call super.
// let newshirt = new Shirt2('short', 'large', 5, 'long')
// newshirt.sold()

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name}, I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "cat", status);
    this.master = master
  }
  introduce() {
    return `${super.introduce()} Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status);
    this.master = master;
  }
  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}
