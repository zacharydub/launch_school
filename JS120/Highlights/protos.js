//prototypal inheritance = The object that you inherit properties and methods from is called the prototype. - All JavaScript objects inherit from a prototype

//nheriting object doesnt get props/methods of its own, rather it delegates prop and method access to the prototype

let a = {
    foo: 1,
    bar: 2,
};

let b = {};
Object.setPrototypeOf(b, a);

console.log(b.foo);                    // => 1
console.log(b);                        // => {}
console.log(Object.getPrototypeOf(b)); // => { foo: 1, bar: 2 }

//search proto chain for some prop and assign it a new value. if prop doesn;t exist do nothing
function assignProperty(obj, property, value) {
    while (obj !== null) {
        if (obj.hasOwnProperty(property)) {
            obj[property] = value;
            break;
        }

        obj = Object.getPrototypeOf(obj);
    }
}
//   let myObj1= { prop: 1 };
// let myObj2 = Object.create(myObj1);
// let myObj3 = Object.create(myObj2);

// assignProperty(myObj3, "prop", 2);
// console.log(myObj1.prop); // 2
// console.log(myObj3.prop); // 2

// assignProperty(myObj3, "qux", 3);
// console.log(myObj1.qux); // undefined
// console.log(myObj3.qux); // undefined
// console.log(myObj1.hasOwnProperty("qux")); // false
// console.log(myObj3.hasOwnProperty("qux")); // false


//Implement an ancestors method that returns the prototype chain (ancestors) of a calling object as an array of object names. 

Object.prototype.ancestors = function ancestors() {
    let ancestor = Object.getPrototypeOf(this);

    if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
        return [ancestor.name].concat(ancestor.ancestors());
    }

    return ['Object.prototype'];
};


let foo = { name: 'foo' };
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']