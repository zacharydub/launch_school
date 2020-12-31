let bob = { name: 'Bob', age: 22 };
let studentBob = Object.create(bob);
studentBob.year = 'Senior';

console.log(studentBob.name); // logs 'Bob'
// Object.create creates a new object and sets the prototype for that object to the object passed in as an argument. 

//iterate over objects

// for-in loop
let person = {
  name: 'Bob',
  age: 30,
  height: '6 ft'
};
for (let prop in person) {
  console.log(person[prop]);
}
// Bob
// 30
// 6 ft
// Note that we use bracket notation within the loop. We can't use dot notation here since prop is a variable that contains a property name, not the property name itself

//for-in iterates over the properties of an object's prototypes as well:
let obj1 = { a: 1, b: 2 }
let obj2 = Object.create(obj1);
obj2.c = 3;
obj2.d = 4;

for (let prop in obj2) {
  console.log(obj2[prop]);
}
// 1
// 2
// 3
// 4
// This behavior is undesirable when you want to limit iteration to an object's own properties, i.e., properties it defined for itself, not properties it inherited.
//For that we can use the hasOwnProperty method:
let obj1 = { a: 1, b: 2 }
let obj2 = Object.create(obj1);
obj2.c = 3;
obj2.d = 4;

for (let prop in obj2) {
  if (obj2.hasOwnProperty(prop)) {
    console.log(obj2[prop]);
  }
}
// 3
// 4


// Object.keys static method returns an object's keys as an array. You can iterate over that array using any technique that works for arrays. For instance:

let person = {
  name: 'Bob',
  age: 30,
  height: '6 ft'
};

let personKeys = Object.keys(person); // returns ['name', 'age', 'height']

personKeys.forEach(key => console.log(person[key]));
// Bob
// 30
// 6 ft
//Object.keys returns the object's own keys: it does not include any keys from the prototype objects 
// VERSUS 
// for/in loop iterates over prototype keys as well


// This static method extracts the values from every own property in an object to an array:
let person = { name: 'Bob', age: 30, height: '6ft' };
let personValues = Object.values(person);
console.log(personValues); // logs [ 'Bob', 30, '6ft' ]
// Be careful: remember that you can't predict the order of the values in the returned array.

// Object.entries static method returns an array of nested arrays. Each nested array has two elements: one of the object's keys and its corresponding value:
let person = { name: 'Bob', age: 30, height: '6ft' };
console.log(Object.entries(person));
// logs [[ 'name', 'Bob' ], [ 'age', 30 ], [ 'height', '6ft' ]]

//To reverse engineer AKA convert the array back into an object:
let nestedArray = [['title', 'Duke'], ['name', 'Nukem'], ['age', 33]]
//solution:
let person = {}
for (i = 0; i < nestedArray.length; i++) {
  let pair = nestedArray[i];
  person[pair[0]] = pair[1];
}

// Object.assign
// You may sometimes want to merge two or more objects, i.e., combine the key-value pairs into a single object
let objA = { a: 'foo' }
// undefined
let objB = { b: 'bar' }
// undefined
Object.assign(objA, objB)
// { a: 'foo', b: 'bar' }
// Object.assign mutates the first object. In the above example, the properties from the b object get added to the a object, altering it permanently in the process:
objA
// { a: 'foo', b: 'bar' }
objB
// { b: 'bar' }
// Note that objB isn't mutated. If you need to create a new object or clone an object, use an empty object as Object.assign's first argument. Note that Object.assign can take more than two arguments:
objA = { a: 'foo' }
// undefined
objB = { b: 'bar' }
// undefined
Object.assign({}, objA, objB)
// { a: 'foo', b: 'bar' }
objA
// { a: 'foo' }
objB
// { b: 'bar' }

// When you need to choose between an object or an array to store some data, ask yourself a few questions:
// 1 - Do the individual values have names or labels? If yes, use an object. If the data doesn't have a natural label, an array should suffice.
// 2 - Does order matter? If yes, use an array.
// 3 - Do I need a stack or queue structure? Arrays are good at mimicking simple "last-in-first-out" stacks and "first-in-first-out" queues.


// select the key-value pairs where the value is 'Fruit'
let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }

function selectFruit(produceList) {
  let produceKeys = Object.keys(produceList);
  let selectedFruits = {};
  for (let counter = 0; counter < produceKeys.length; counter++) {
    let currentKey = produceKeys[counter];
    let currentValue = produceList[currentKey];
    if (currentValue === 'Fruit') {
      selectedFruits[currentKey] = currentValue;
    }
  }
  return selectedFruits;
}