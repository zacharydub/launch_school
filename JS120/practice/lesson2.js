//check if prop exits - 'in' operator + myObj.hasOwnProperty 
let obj = {
  a: 1, b: 2,
  true() { console.log('i\'m a method') }
}
console.log('a' in obj)
console.log('c' in obj)
console.log(obj.hasOwnProperty('a'))
console.log(obj.hasOwnProperty('c'))

//list all props - Object.keys and Object.getOwnPropertyNames
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))

// //i thought Object.keys lists only enumerable and methods aren't enumerable?

//prototypes
let b = Object.create(obj)
console.log(Object.getPrototypeOf(b))
console.log(b)
console.log(b.true())
let c = {}
Object.setPrototypeOf(c, obj)
console.log(c)
console.log(c.true())
let d = {}
d.__proto__ = obj // this works
// d.__proto__ = obj.prototype --- this doesnt work
console.log(d.true())

//looping with objects and prototype
console.log(Object.keys(d)) // only own props
for (keys in d) {           // all props incl inherited
  console.log(keys)
}
for (keys in d) {
  if (d.hasOwnProperty(keys)) {
    console.log(keys)
  }
}
console.log(d.constructor)
console.log(Object.getPrototypeOf(d))

// // define the difference between a constructor and a prototype

console.log(obj.toString())

//proto chain lookup
let ab = {}
let bc = Object.create(ab)
let cd = Object.create(bc)

console.log(ab.isPrototypeOf(bc))
console.log(ab.isPrototypeOf(cd)) //works as expected

console.log(Object.getPrototypeOf(bc))
console.log(Object.getPrototypeOf(cd)) //returns empty obj

function func1() { }
function func2() { }
func2.__proto__ = func1.prototype
function func3() { }
func3.__proto__ = func2
console.log(Object.getPrototypeOf(func2)) // => func1 {} ---- good
console.log(Object.getPrototypeOf(func3)) // // => [Function: func2] func1 ---->what is func1 doing there?
console.log(func1.isPrototypeOf(func2))
console.log(func1.isPrototypeOf(func3))// // why are these coming up as false?

let myFunc = function () { }
console.log(typeof myFunc)

//exC
let myFunc1 = function (x) {
  console.log(this.num + x)
}

let myObj = { num: 42 }

myFunc1.call(myObj)//notice this will still log 42 even tho we're telling it to log "this.num++" ---> the ++ gets ignored
console.log(myObj.num)
myFunc1.call(myObj, 5)

let ob3 = {
  a: 'hi',
  b: 'there',
  foo: function () {
    let bar = () => {
      console.log(this.a + this.b)
    }
    bar()
  }
}
ob3.foo()