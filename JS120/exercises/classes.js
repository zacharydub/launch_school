//#1
console.log("Hello".constructor.name);
console.log([1, 2, 3].constructor.name);
console.log({ name: 'Srdjan' }.constructor.name);

//#2-6
class Cat {
  constructor(name) {
    // console.log('I\'m a cat');
    this.name = name;
  }
  greet() {
    console.log(`Hello! My name is ${this.name}`)
  }
}
let kitty = new Cat('Sophie')
kitty.greet()

//#7
class Person {
  constructor(name = 'John Doe') {
    this.name = name;
  }
}
let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe

// #7
class Cat1 {
  constructor(name) {
    this.name = name;
  }
  rename(input) {
    this.name = input
  }
}

let kitty1 = new Cat1('Sophie');
console.log(kitty1.name); // Sophie
kitty1.rename('Chloe');
console.log(kitty1.name); // Chloe

//#8-9
class Cat2 {
  constructor(name) {
    this.name = name;
  }
  static genericGreeting() {
    console.log('Hello! I\'m a cat!')
  }
  personalGreeting() {
    console.log(`Hello! My name is ${this.name}`)
  }
}

let kitty2 = new Cat2("Sophie");
Cat2.genericGreeting();
kitty2.personalGreeting();