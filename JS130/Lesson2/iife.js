// http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html
// https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoke


//need a func expression to form an IIFE

//PRIVACY
//any variables declared inside the IIFE are invisible/inaccessible outside of it

(function IIFE_initGame() {
    // Private variables that no one has access to outside this IIFE
    var lives;
    var weapons;
    init();
    // Private function that no one has access to outside this IIFE
    function init() {
        lives = 5;
        weapons = 10;
    }
}());
//Whenever you are creating a bunch of variables and functions in global scope that no one uses outside your code, just wrap all of that in an IIFE. Your code will continue to work, but now you are not polluting global scope. Also you are shielding your code from someone who may change your global variables

//But another really important and powerful feature of IIFEs is that they can return a value that can be assigned to a variable:
var result = (function () {
    return "return value from IIFE";
}());
console.log(result); // alerts "From IIFE"

// IIFEs can also take arguments while they are invoked:
(function IIFE(msg, times) {
    for (var i = 0; i <= times; i++) {
        console.log(msg);
    }
}("Hello!", 5));


//IIFE to return object with methods - combining IIFE and closures:
var Sequence = (function sequenceIIFE() {
    // Private variable to store current counter value.
    var current = 0;
    // Object that's returned from the IIFE.
    return {
        getCurrentValue: function () {
            return current;
        },
        getNextValue: function () {
            current = current + 1;
            return current;
        }
    };
}());
console.log(Sequence.getNextValue()); // 1
console.log(Sequence.getNextValue()); // 2
console.log(Sequence.getCurrentValue()); // 2


//how to do regular for loop within IIFE??
// (function IIFE(msg, count) {
//     var i
//     return function () {
//         for (i = count; i <= 5; i++) {
//             console.log(`${msg} - ${count}`);
//         }
//     }
// }("Hello!", 0));



!function () {
    console.log("Hello from IIFE!");
}();
//the '!' forces JS to treat whatever comes after as an expression - any unary operator such as + or - or ~
//this style only useful when dont care about the return value
