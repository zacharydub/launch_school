// // 1 Write three different ways to remove all of the elements from the following array:
let numbers = [1, 2, 3, 4];
// 1 - numbers = []
// 2 - numbers.length = 0
// 3 - numbers.splice(0,numbers.length)
// 4 - while (numbers.length){
// numbers.pop()}

// // #2
// What will the following code output?
// console.log([1, 2, 3] + [4, 5])
// In JavaScript, the + operator first converts the arrays to strings, and then concatenates the strings, so the output is the string 1,2,34,5.

// // #4
// What will the following code output?
let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

// The output will be:

// [ { first: 42 }, { second: 'value2' }, 3, 4, 5 ]
// The slice() method copies all the elements of the array and returns a new array. However, it performs a shallow copy rather than a deep copy. Thus, arr1[0] and arr2[0] point to the same object, { first: "value1" }. Thus, when we replace the value of first in that object by using arr2, the change shows up in arr1 as well.