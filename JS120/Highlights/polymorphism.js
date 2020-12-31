//polymorphism
//the ability of objects with different types to respond in different ways to the same message (or method invocation); that is, data of different types can respond to a common interface. 

//thru inheritance + overriding
//AKA toString() method defined on Object.prototype and inherited+overriden/customized by other non-object literals such as arrays and dates
// class Garment {
//     method1() {
//         console.log('hello garment')
//     }
// }
// class Shirt extends Garment {
//     method1() {
//         console.log('hello shirt')
//     }
// }
// class Pants extends Garment { }

//via duck typing - when two totally otherwise unrelated objects have a method of the same name

let personObj = {
    method1() {
        console.log('inside person object')
    }
}

let shoeObject = {
    method1() {
        console.log('inside shoe object')
    }
}
