//OLOO
//object creation pattern based on creating new objects with Object.create method using prototype objects. Object creation and propertly initialization occur in separate stages (unlike constructor functions invoked with new keyword)
//Because OLOO Pattern does not use constructors, examining inheritance with methods like Object.prototype.constructor will not work as expected and simply return Object.prototype (the top element in the prototypal inheritance hierarchy). Instead, isPrototypeOf and Object.getPrototypeOf could be used for such purpose. Also, we can not use instanceof because the right-hand operand has to be a function.
// let garment = {
//     init(type, size, count) {
//         this.type = type;
//         this.size = size;
//         this.count = count;
//         return this;
//     },
//     method1() {
//         this.count++
//     }
// }
// let cloth = Object.create(garment).init('tshirt', 'xs', 5)
// console.log(cloth)
//init is a method used to initialize props in newly created objects inheriting from this prototype
//instantiate new object with `Object.create` where the argument passed in is the object prototype for the newly created object assigned to the variable `cloth`.
//OLOO considered delegation pattern (sharing methods) rather than inheritance pattern (sub-types and super-types, constructor functions and prototype prop)