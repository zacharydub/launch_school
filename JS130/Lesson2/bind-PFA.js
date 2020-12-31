https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind


function list() {
    return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

const list1 = list(1, 2, 3);
//  [1, 2, 3]

const result1 = addArguments(1, 2);
//  3

// Create a function with a preset leading argument
const leadingThirtysevenList = list.bind(null, 37);
console.log(leadingThirtysevenList.arguments)
// Create a function with a preset first argument.
const addThirtySeven = addArguments.bind(null, 37);

const list2 = leadingThirtysevenList();
//  [37]

const list3 = leadingThirtysevenList(1, 2, 3);
//  [37, 1, 2, 3]

const result2 = addThirtySeven(5);
//  37 + 5 = 42 

const result3 = addThirtySeven(5, 10);
//  37 + 5 = 42
//  (the second argument is ignored)



//example
//Impartial function
function impartial(x, y, z) {
    return x + y + z;
}
var partialFn = impartial.bind(this, 1, 2);
partialFn(10); // Returns 13