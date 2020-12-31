//code throws error, fix by using IIFE:
var sum = 0;
sum += 10;
sum += 31;
let numbers = [1, 7, -3, 3];
function sum(arr) {
    return arr.reduce((sum, number) => {
        sum += number;
        return sum;
    }, 0);
}
sum += sum(numbers);  // ?
//solution:
var sum = 0;
sum += 10;
sum += 31;

let numbers = [1, 7, -3, 3];

sum += (function (arr) {
    return arr.reduce((sum, number) => {
        sum += number;
        return sum;
    }, 0);
})(numbers);

//countdown(7) logs numbers from 7 to 0. Replace that invocation with IIFE:
(function (num) {
    for (let idx = num; idx >= 0; idx--) {
        console.log(idx)
    }
})(7)

//rewrite following code using IIFE. No longer need the name 'foo':
function foo(start) {
    let prod = start;
    return function (factor) {
        prod *= factor;
        return prod;
    };
}
let bar = foo(2);
let result = bar(3);
result += bar(4);
result += bar(5);
console.log(result);

//solution:
let bar = (function (start) {
    let prod = start;
    return function (factor) {
        prod *= factor;
        return prod;
    };
})(2);

let result = bar(3);
result += bar(4);
result += bar(5);
console.log(result);