//constructors
//in simple constructor pattern (without prototypes), all methods are also in constructor, not on prototype object. Created object will still have their own copy of methods, but their source can be traced by using constructor property on the instances.

//when a function is invoked with the 'new' keyword, that function becomes a constructor function and the following things happen:
//1-5
//prototype prop returns the object we use to share methods. constructor functions set the object prototype for the objects they create to the constructor's prototype object.
// newly created objects share methods defined on the constructor function prototype AKA constructor's prototype prop, meaning the instances dont hold their own copies of these methods but can still use them by delegating method access to that prototype object.

// function Garment(type, size, count) {
//     this.type = type;
//     this.size = size;
//     this.count = count;
//     this.stock = function stockIt() {
//         this.count++
//     }
// }
// let garment1 = new Garment('shirt', 'large', 5)
// console.log(garment1)
// garment1.hasOwnProperty(count)
// console.log(garment1.count)
// console.log(Object.keys(garment1))
// console.log(garment1 instanceof Garment)
// console.log(garment1.constructor.name) // Functions also contain a prototype property that contains a prototype object. This object contains a property called constructor that refers back to the function. 

// console.log(garment1.__proto__)
// console.log(Object.getPrototypeOf(garment1))
// let vars = { type: 'tshirt', size: 'small', count: 5 }

// function Garment1(args) {
//     this.type = args.type;
//     this.size = args.size;
//     this.count = args.count;

//     this.sell = function () {
//         console.log('sell it')
//     }
// }
// function Garment2(args) {
//     Object.assign(this, args)

// }
// let garment2 = new Garment1(vars)
// console.log(garment2.size)
// let garment3 = new Garment2(vars)
// console.log(garment3.type)

//constructors with prototypes
// Pseudo-Classical pattern of object creation generates objects using a constructor function that defines state, then defines shared behaviors on the constructor's prototyp that newly created objects get shared access to to thanks to prototypal inheritance
// function Garment4(type, size, count) {
//     this.type = type;
//     this.size = size;
//     this.count = count;
//     Garment4.allGarments.push(this) // all newly created garments objects created by the constructor function will be pushed to the array - this is a common use of static 
// }
// Garment4.allGarments = [] //static prop contains an array with a reference to every garment object created
// Garment4.species = 'fabric'
// Garment4.staticMethod = function () {
//     console.log('static method')
// }

// Garment4.prototype.method1 = function () {
//     console.log("instance method")
// }
// let cloth = new Garment4('t', 'xl', '40')
// let cloth2 = new Garment4('t', 'xl', '40')
// let cloth3 = new Garment4('t', 'xl', '40')
// // console.log(Garment4.allGarments)
// // console.log(cloth2.allGarments) // static props unavailable to instances
// // console.log(Garment4.species)
// // console.log(cloth.size)
// // console.log(cloth.hasOwnProperty('method1'))
// // console.log(cloth.hasOwnProperty('size'))
// // cloth.method1 = function () { console.log('something') }
// // console.log(cloth.hasOwnProperty('method1')) //override inherited method

// let obj = {}
// let obj2 = Object.create(obj)
// // console.log(obj2.constructor.name)
// //Since obj is not a function, it does not have a prototype property and also does not have a ‘constructor’ property. So when Javascript goes looking for a ‘constructor’ property on obj2 it notices that obj2itself does not have one. It then goes and looks at theobject that the __proto__ on obj2 refers to, which is obj because of line 8 (Object.create). Javascript will notice that obj also does not have a ‘constructor’ property and will then look at the object referred to by the __proto__ on obj, which is Object.prototype because obj is an object literal. Javascript will then find a ‘constructor’ property in the object referred to by Object.prototype and that ‘constructor’ property will point to Object itself, making our expression return ‘Object’. This is why when we use Object.create, we must manually define a ‘constructor’ property on the object that we pass into Object.create for our ‘constructor’ property to make logical sense.



//object creation pattern models:
// - Relationships - can i tell how this obj was created? can i tell how it relates to other object?

// - Redundancy - Does this help me dry up my code? does this help me save space in memory? - are methods pointing to same object(good) or different object in memory (bad)


