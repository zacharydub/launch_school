const mixin = {
    mixMethod() { }
};

class someClass {
    //defined directly on class
    classMethod() { }
};

    Object.assign(someClass.prototype, mixin);

    //defined directly on prototype
    someClass.prototype.otherMethod = function() {
};

console.log(Object.keys(someClass.prototype));
console.log(Object.getOwnPropertyNames(someClass.prototype));
