//On comparing different patterns:
// 1- Relationships - can i tell how this obj was created? can i tell how it relates to other object?
// 2- Redundancy - Does this help me dry up my code? does this help me save space in memory? - are methods pointing to same object(good) or different object in memory (bad)

//factory function
function createGarment(type, size, brand = 'Gap', wanted) {
    return {
        type: type,//'initializer' to the right of the two dots, which gets dropped in shorthand when prop name === param name
        size,
        brand,
        wanted: wanted || false,
        want() {
            this.wanted = true;
        },
        isWanted() {
            return `This shirt ${this.wanted ? 'is' : 'is not'} wanted.`;
        }
    }
}
let garm = createGarment('t', 'Large')
console.log('Factory: \n ', garm)

function newShirt(cut) {
    return {
        cut,
        unbutton() { return 'unbutton' }
    }
}

function createShirt(type, size, cut) {
    return Object.assign({}, createGarment(type, size), newShirt(cut))
}

let shirt = createShirt('tshirt', 'medium', 'vneck')
console.log('Vneck', shirt)
//OLOO
//object creation pattern based on creating new objects with Object.create method using prototype objects. Object creation and propertly initialization occur in separate stages (unlike constructor functions invoked with new keyword)
//Because OLOO Pattern does not use constructors, examining inheritance with methods like Object.prototype.constructor/myObj.constructor and instanceof will not work as expected - constructor willreturn Object.prototype (the top element in the prototypal inheritance hierarchy) while instanceof will return error bc it requires right-hand operand to be a function. Instead, isPrototypeOf and Object.getPrototypeOf could be used for such purpose. 
//init is a method used to initialize props in newly created objects inheriting from this prototype - with OLOO, the creation vs initialization of the objects occurs at separate times
//instantiate new object with `Object.create` where the argument passed in is the object prototype for the newly created object assigned to the variable `cloth`.
//OLOO considered delegation pattern (sharing methods) rather than inheritance pattern (sub-types and super-types, constructor functions and prototype prop)
let garmentObj = {
    init(type, size, count) {
        this.type = type;
        this.size = size;
        this.count = count;
        return this; // refers to the newly created object which called it, so we can now chain the create and init methods in one line and assign result/return value to the new object
    },
    method1() {
        this.count++
    },
    sayHi() { return 'sayhi' }
}

let cloth = Object.create(garmentObj) // creates empty object that has access to the props defined on the object argument 
console.log(cloth.sayHi())
console.log('OLOO: \n', cloth)
cloth.init('sweater', 'medium', 1)
console.log(cloth)
let cloth2 = Object.create(garmentObj).init('tshirt', 'xs', 5)

console.log('OLOO: \n', cloth2)



//constructors
//in simple constructor pattern (without prototypes), all methods are also in constructor, not on prototype object. Created object will still have their own copy of methods, but their source can be traced by using constructor property on the instances.
//when a function is invoked with the 'new' keyword, that function becomes a constructor function and the following things happen: 1-5 (create new object, invoke constructor function, set 'this' to refer to new object, set dunder proto of new object to constructor function prototype, return new object)
//prototype prop returns the object we use to share methods. constructor functions set the object prototype for the objects they create to the constructor's prototype object.
// newly created objects share methods defined on the constructor function prototype AKA constructor's prototype prop, meaning the instances dont hold their own copies of these methods but can still use them by delegating method access to that prototype object.
function Garment(type, size, count) {
    this.type = type;
    this.size = size;
    this.count = count;
    Garment.allGarments.push(this) // all newly created garments objects created by the constructor function will be pushed to the array - this is a common use of static 
}
Garment.allGarments = [] //static prop contains an array with a reference to every garment object created
Garment.species = 'fabric'
Garment.staticMethod = function () {
    console.log('static method')
}

Garment.prototype.method1 = function () { //if you assign your constructor’s prototype to an object literal instead of using the dot notation, you will overwrite the default constructor property and it will instead point to Object (myObj.constructor === Object), so we'd have to correct it after the fact for each new object (myObj.constructor = constrFunc).Alternatively, if inside the object literal prototype assignment we explicitly set the constructor prop to itself, we'd be messing up the constr prop's default [[Enumerable]] attribute (from false to true), so we'd also need to define the enumerable value of the constr prop to 'false' using Object.defineProperty
    console.log("instance method")
}
// console.log(garment.constructor.name) // Functions also contain a prototype property that contains a prototype object. This object contains a property called constructor that refers back to the function. 


//constructors with prototypes
// Pseudo-Classical pattern of object creation generates objects using a constructor function that defines state, then defines shared behaviors on the constructor's prototyp that newly created objects get shared access to to thanks to prototypal inheritance
function Shirt(color, type, size, count) {
    Garment.call(this, type, size, count)
    this.color = color;
}
// using the Garment constructor to set the props already defined there by way of invoking the Garment constructor with call to explicitly set the exC to the conext of Square
// all objects created by the Shirt constructor inherit from Shirt.prototype, and that's where we store the methods we want shared by all shirt objects.

Shirt.prototype = Object.create(Garment.prototype)//not assigning to just supertype.prototype because then the 2 protos will reference the same object in memory and therefore props defined on one will be available to the other. And we'll have a broken proto chain where Dog wont be lowr on chain than Animal + cant determine type by using getPrototypeOf(myObj) since that will return same object
//alternatively can also do:
Shirt.prototype = new Garment()//but this way may come with some extra unnecessary props whereas Object.create doesnt come with this excess baggage
Shirt.prototype.constructor = Shirt // after we reassign Shirt.prototype to a new object that inherits from Garment.prototype, and the contstructor prop of Garment.prototype references Garment, so Shirt.prototype.constructor now points to Garment as well, so we need to reset that constructor prop to point to Shirt.
let tshirt = new Shirt()

Garment.prototype.isPrototypeOf(tshirt) === true

//ES6 classes
class GarmentClass {
    constructor(type, size, count) {
        this.type = type;
        this.size = size;
        this.count = count;
    }
    sell(msg) {
        this.count -= 1;
        return 'sell it ' + msg;
    }
    toString() {
        console.log(`Garment ${this.type}`)
    }
    partial() {
        return 'this is part of a '
    }
}
//this code defines a GarmentClass class with 3 methods. The constructor methods initialized a new GarmentClass object by assigning the instance props this.type,this.size,and this.count to the associated props specified by the corresponding arguments. Sell method returns the string sell it and concatenates a passed in msg argument, and the toString method logs blah blah and returns undefined.

class ShirtClass extends GarmentClass {
    constructor(type, size, count, sleeves) {
        super(type, size, count);
        this.sleeves = sleeves;
    }
    toString() {
        return `Shirt ${this.sleeves}`
    }
    sold() {
        return super.sell('sooold')
    }
    sellShirt() {
        return super.sell('shirt') + 'good shirt'
    }
    complete() {
        return `${super.partial()} sentence.`
    }
}
let shirt = new ShirtClass()
console.log(shirt.complete())
//constructor method in subtype class requires arguments that differ from constructor method in supertype class, so we must define a constructor method for subtype, and that method must be sure to call super.

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
    hello() {
        return 'hello'
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
    greetMaster() {
        return `Hello ${this.master}! Woof, woof!`;
    }
    greet() {
        return this.hello()
    }
}

//PSEUDO-CLASSICAL inheritance vs PROTOTYPAL DELEGATION
//Pseudo-Classical inheritance makes use of constructor functions and the constructor function's prototype property to delegate method access, while prototypal delegation doesn't use constructors and prototypes, rather it uses JavaScript's internal [[Prototype]] property to delegate method access to the object pointed to by [[Prototype]]/dunder proto.

// They are related in that Pseudo-Classical inheritance relies on prototypal delegation to share/delegate method access, since the constructor function's prototype object of a sub-type gets its internal [[Prototype]] property (or its dunder proto property) set to the parent object (the constructor function prototype's of the super-type). So both paradigms set the inheriting object's [[Prototype]]/dunder proto property to a parent object.


//pseudo pattern combined in constructor func:
let Album = function (name = 'N/A', artist = 'N/A', year = 'N/A') {
    this.name = name;
    this.artist = artist;
    this.year = year;
    if (typeof this.readTag !== 'function') {
        Object.getPrototypeOf(this).readTag = function () {
            console.log(this.name + ' by ' + this.artist);
            console.log('Released in ' + this.year);
        };
    }
    if (!this.type) {
        Object.getPrototypeOf(this).type = 'Prog-rock';
    }
};
let inAbsentia = new Album('In Absentia', 'Porcupine Tree', '2002');
console.log(inAbsentia.type)

//reassigning protototype object constructor prop to something else:
// class Shirty { }
//     Shirty.prototype.constructor = function () { }
// let doggie = new Shirty()
// //testing:
// console.log(doggie.constructor === Shirty) // false
// console.log(doggie instanceof Shirty) // true
// //NOTE: instanceof still works even when the constructor prop doesnt for this scenario
