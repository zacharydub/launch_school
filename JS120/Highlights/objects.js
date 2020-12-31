//object literal

// property keys are always strings. If you define a property with a non-string key, it will first be converted to a string.

let myObject = {};

myObject[false] = 'one';
myObject[7] = 'two';
myObject[[1, 2, 3]] = 'three';

console.log(Object.keys(myObject));                // ["7", "false", "1,2,3"]

console.log(myObject[false])                     // “one”
console.log(myObject[7]);                      // “two”

myObject['a - key'] = 'four'

myObject.a - key           // SyntaxError (a-key is not a valid variable name)
myObject['a - key']        // “four”

// brackets ([]) can take any UTF-8-compatible string as the key, while the dot notation requires valid variable names

// let garment = {
//     type: 'shirt',
//     brand: 'Gap',
//     size: 'Large',
//     price: 2000,
//     count: 0,
//     wanted: false,
//     sell: function () {
//         this.count--
//     },
//     stock() {
//         this.count++
//     },
//     unbutton() {
//         console.log('Buttons undone')
//     }
// }

//collaborators
let LS = {
    type: 'Mastery',
    year: 2020,
}
let myObj = {
    name: 'Zach',
    school: LS,
}

//the LS object serves as a collaborator object to myObj since it's being used to store state within anothre object, myObj - myObj has a collaborator object stored in its school property

// console.log(myObj.school.year);
// LS.year = 2021;
// console.log(myObj.school.year);

let collabObj = {
    name: 'Friend1',

    saySomething() {
        console.log('Hello!');
    },
};

let myObj = {
    name: 'Zach',
    friend: collabObj,

    printName() {
        console.log(`My name is ${this.name}!`);
        console.log(`My friend's name is ${this.friend.name}`);
    },
};

let someObj = {
    color: 'blue',
    availableColors =[],
    addColor(newColor) {
        this.availableColors.push(newColor)
    },

}
//- the `myObj` has a collaborator object, `collabObj` , stored in its `friend` property. We can use `myObj.friend` to access that collab object - `myObj.friend.saySomething()`
// - collabs can also be built-in objects like arrays and dates, or primitives



//objects -
//- 'in' operator VS Object.keys VS for/in loop
// hasOwnProperty,getOwnPropertyNames
// let obj1 = {a:0,b:1,c:2}
// console.log('b' in obj1) // checks thruout proto chain
// console.log('d' in obj1)
// console.log(obj1.someKey) // undefined
// console.log(obj1.hasOwnProperty('b'))
// console.log(obj1.hasOwnProperty('d'))
// console.log(Object.keys(obj1)) // only 'own' props
// console.log(Object.getOwnPropertyNames(obj1)) // returns all properties regardless if they’re enumerable or not


//Example of for/in and Object.keys returning different values:
// let someObj = {a:1,b:2};
// // let otherObj = Object.create(someObj)
// let otherObj = {}
// Object.setPrototypeOf(otherObj,someObj)
// let thirdObj = Object.create(otherObj)
// otherObj.c = 3
// for(let prop in otherObj){
//     console.log(`${prop}:${otherObj[prop]}`)
// }
// for(let prop in someObj){
//     console.log(`${prop}:${someObj[prop]}`)
// }
// console.log(Object.keys(otherObj))

//for/in and Object.keys produce the same results only when the prototype chain doesn't contain enumerable properties

// console.log(Object.getPrototypeOf(otherObj))
// console.log(someObj.isPrototypeOf(thirdObj))
//objects someObj and otherObj are part of the prototype chain of thirdObj


