//collaborators
let collab = {
  1: 'hello'
}
let obj1 = {
  a: 1, b: collab,
  update() { this.a += 1 }
}
console.log(obj1)
console.log(obj1.a)
obj1.update()
console.log(obj1.a === obj1.b)
console.log(obj1.b)

//function factory
function factory(arg1, arg2, truthy = true, falsy = false) {
  return {
    prop1: arg1,
    arg2,
    really: truthy,
    falsy,
    initialSet: 'initial',
    updateMethod: function () {
      console.log("i'm a method");
      this.prop1 -= 1;
    },
  }
}
let obj2 = factory(2, 3)
console.log(obj2)
obj2.updateMethod()
console.log(obj2)

//reusing factory functions using Object.assign
function factory1() {
  return Object.assign({}, obj2)
}
let newobj = factory1()
newobj.updateMethod()
console.log(Object.getOwnPropertyNames(factory))
console.log(factory.constructor)

// // 'arguments' prop

//