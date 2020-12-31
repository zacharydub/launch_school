//when we use Object.create, we must manually define a ‘constructor’ property on the object that we pass into Object.create for our ‘constructor’ property to make logical sense - since object literals dont have their own copy of a constructor property - rather they inherit it from Object.prototype - so by default, an object literal's constructor property returns Object.prototype, and not the object pointed to by the object literal's dunder proto

reflect.destruct

//inheritance via subtype.prototype = Object.create(supertype.prototype) then fix the subtype.prototype.constructor prop----can also do inheritance via subtype.prototype.__proto__ = super.type.prototype and wont need to fix consstructor prop, but not good for performance

//if invoke function with 'new' keyword, any prop set as this.name = name - that 'name' prop is now a global variable -- 'polluting of the namespace'
//can guard against constructor functions not getting invoked with 'new' by using:
function Person(name) {
    if (!(this instanceof Person))
        return new Person(name)
    this.name = name
}
//this way, we can call the constructor as a function without 'new' and no polluting of namespace/no global variables
//can still invoke the func with 'new' as normal, since JS will return that explicit return value-object (not primitives - those are ignored) in a constructor func

can you make a static class i.e prevent it from being invoked with new keyword ?

    example of needing to use 'this' to set props instead of myObjName bc in case the props get passed to another object who refers to their args by a diff name

better to access props via methods, not state directly.why ?




