
// // #1
// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }
//   getWidth() {
//     return this.width
//   }
//   getLength() {
//     return this.length
//   }
//   getArea() {
//     return this.width * this.length
//   }
// }
// let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20

// // #2
// class Square extends Rectangle {
//   constructor(side) {
//     super(side, side)
//   }
// }

// let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); // area of square = 25

// #3
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype)// your implementation
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.

// #4
// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age)
//     this.color = color;
//   }
//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`
//   }
// }
// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');
// console.log(pudding.info());
// console.log(butterscotch.info());

// // see student solution
// Since constructor method in Cat class requires arguments that differ from constructor method in Pet class, we must define a constructor method for Cat, and that method must be sure to call super.
// An alternative approach to this problem would be to modify the Pet class to accept a colors parameter. If we did this, we wouldn't need to supply an constructor method for Cat. Why? Because no constructor method on an extending class calls constructor automatically and passes all arguments to super

// #5

class Animal {
  constructor(name, age, status, legs, species) {
    this.name = name;
    this.age = age;
    this.status = status;
    this.legs = legs;
    this.species = species;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, status, 4, 'cat');
    this.legs = 4
    this.species = 'cat';
  }
  introduce() {
    return `${super.introduce()}.Meow meow!`
  }
}
class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, status, 4, 'dog');
    this.master = master;

  }
  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`
  }
}

let cat = new Cat('zach', 31, 'happy')
console.log(cat)
console.log(cat.legs)
console.log(cat.species)
console.log(cat.introduce())
let dog = new Dog('zach', 31, 'happy', 'God')
console.log(dog)
console.log(dog.legs)
console.log(dog.species)
console.log(dog.introduce())
console.log(dog.greetMaster())
// In the Cat class constructor method we are using super keyword to invoke constructor method of the parent class Animal. We need to pass 5 arguments to it (name, age, legs, species and status), as this is how many arguments Animal constructor method takes.

// #6
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  info() { return `${this.make} ${this.model}`; }
}

class Car extends Vehicle {
  getWheels() { return 4; }
}

class Motorcycle extends Vehicle {
  getWheels() { return 2; }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }
  getWheels() { return 6; }
}
//All of our constructor methods take make and model parameters, and store them in make and model properties. We can refactor all of this commonality into Vehicle by moving constructor from one of the classes into Vehicle, and deleting it from both Car and Motorcycle. However, our Truck class takes a 3rd parameter payload, so we can't just delete constructor method in Truck class.


// #7
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); // ByeBye
console.log(thing.dupData()); // HelloHello
//Here we see two methods named dupdata in the Something class. However, one is defined as dupdata, and is thus an instance method. The other has static keyword in front of its name and so it is a static method. The two methods are different, and are completely independent of each other.

//#8
// function Person() {
// }
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

// function Shouter() {
//   Person.call(this);
// }
// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

class Person {
  greeting(text) {
    console.log(text)
  }
}
class Shouter extends Person {
  greeting(text) {
    super.greeting((text.toUpperCase()));
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

// #9

const mixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`
  }
}
class Person1 {
  constructor(name) {
    this.name = name;
  }
  gait() { return "strolls"; }
}
class Cat1 {
  constructor(name) {
    this.name = name;
  }
  gait() { return "saunters"; }
}
class Cheetah {
  constructor(name) {
    this.name = name;
  }
  gait() { return "runs"; }
}
Object.assign(Person1.prototype, mixin)
Object.assign(Cat1.prototype, mixin)
Object.assign(Cheetah.prototype, mixin)
let mike = new Person1("Mike");
console.log(mike.walk());// "Mike strolls forward"
let kitty = new Cat1("Kitty");
console.log(kitty.walk());// "Kitty saunters forward"
let flash = new Cheetah("Flash");
console.log(flash.walk());// "Flash runs forward"

// #10

class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
  info() {
    return ` a ${this.species} named ${this.name}`
  }
}
class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  numberOfPets() {
    return this.pets.length;
  }
  printPets() {
    this.pets.forEach(pet => console.log(pet.info()));
  }

}
class Shelter {
  constructor() {
    this.owners = {};
  }
  adopt(ownerName, petName) {
    ownerName.addPet(petName);
    if (!this.owners[ownerName.name]) {
      this.owners[ownerName.name] = ownerName;
    }
  }
  printAdoptions() {
    for (let name in this.owners) {
      console.log(`${name} has adopted the following pets:`);
      this.owners[name].printPets();
      console.log("");
    }
  }
}
let butterscotch = new Pet('cat', 'Butterscotch');
let pudding = new Pet('cat', 'Pudding');
let darwin = new Pet('bearded dragon', 'Darwin');
let kennedy = new Pet('dog', 'Kennedy');
let sweetie = new Pet('parakeet', 'Sweetie Pie');
let molly = new Pet('dog', 'Molly');
let chester = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

//In our solution, the Pet class has two String collaborator objects, Owner has a String and an Array of Pet objects, and Shelter has an Object of Owner objects.

// #11
class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.message.length)}-+`
  }

  emptyLine() {
    return `|${' '.repeat(this.message.length + 2)}|`
  }

  messageLine() {
    return `| ${this.message} |`
  }
}
let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+
let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+