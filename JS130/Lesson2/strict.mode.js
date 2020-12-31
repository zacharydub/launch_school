function foo() {
    "use strict";
    // All code here runs in strict mode
}

function bar() {
    // All code here runs in sloppy mode
    foo(); // This invocation is sloppy mode, but `foo` runs in strict mode
    // All code here runs in sloppy mode
}

//OR

function foo() {
    // All code here runs in sloppy mode
}

function bar() {
    "use strict";
    // All code here runs in strict mode
    foo(); // This invocation is strict mode, but `foo` runs in sloppy mode
    // All code here runs in strict mode
}


//implicit context - using function call syntax on a method sets this set to undefined
"use strict";

let obj = {
    a: 5,
    go() {
        this.a = 42; // TypeError: Cannot set property 'a' of undefined
    },
};
let doIt = obj.go;
doIt();
console.log(obj.a); // 5
