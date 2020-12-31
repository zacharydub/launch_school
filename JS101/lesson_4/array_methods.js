let produceKeyValues = Object.entries(produce);
// produceKeyValues contains:
//   [['apple', 'Fruit'],
//    ['carrot', 'Vegetable'],
//    ['pear', 'Fruit'],
//    ['broccoli', 'Vegetable']]
produceKeyValues.forEach(keyValue => {
  let [key, value] = keyValue; // 1st array element assigned to 1st variable, 2nd element to 2nd variable, etc
  console.log(`${key} is a ${value}`);
});
// logs: apple is a Fruit

//**** */
//Watch out for return values of functions - implicit return with no curly braces+same line, otherwise need to explicitly write return:
[1, 2, 3].map(num => {
  num * 2;
});
[undefined, undefined, undefined]

//some(cb) and every(cb) 
// some -  tests whether ***at least one element*** in the array passes the test implemented by the provided function. It returns a Boolean value.
// every -  tests whether ***all elements*** in the array pass the test implemented by the provided function. It returns a Boolean value.
// find(cb) - returns the value of the first element in the provided array that satisfies the provided testing function. Undefined if no truthy matches.
// findIndex(cb - similar to find except it returns the index of the element for which the callback returns a truthy value. Returns -1 (not undefined) if no truthy matches
//reverse - mutates
//slice + reverse to create a copy
//includes - returns boolean

//arrays as objects - array 'keys'
// We can add properties to the object arr that are not elements of the array. All we have to do is use a key that is not an unsigned integer; it doesn't even have to be a number:
let arr = [2, 4, 6]
arr[-3] = 5;
arr['foo'] = 'a';
console.log(arr);              // [ 2, 4, 6, '-3': 5, foo: 'a' ]
console.log(arr.length);       // 3
console.log(Object.keys(arr))  // [ '0', '1', '2', '-3', 'foo' ]
arr.map(x => x + 1);           // [ 3, 5, 7 ]

let arr = [];
arr[-3] = 5;
arr['foo'] = 'a';
// Is arr empty?
console.log(arr.length);       // 0                Yes
console.log(Object.keys(arr))  // [ '-3', 'foo' ]  No
// To determine whether arr is empty on lines 6 and 7, we first need to define what we mean by an empty array. If we're only interested in elements, then we can use length to determine whether the array is empty. However, if we need to include non-elements, then we need to look at the object keys to learn whether the array is empty. There is no one right answer here. That's a decision you have to make when writing the code.

//sparse arrays - The number of elements in an array isn't necessarily the same as its length: there can be gaps in the array. One way to create these gaps is by increasing the size of the length property without adding any values to the array:
let arr = [2, 4, 6];
arr.length = 5;
console.log(arr);              // [2, 4, 6, <2 empty items> ]
console.log(arr.length);       // 5
console.log(Object.keys(arr))  // ['0', '1', '2']

let arr = [];
arr.length = 3;
// Is arr empty?
console.log(arr.length);       // 3      No
console.log(Object.keys(arr))  // []     Yes
// To determine whether arr is empty on lines 5 and 6, we again need to determine what we mean by an empty array. If we want to include the gaps, then we can use length to determine whether the array is empty. However, if we need to ignore the gaps, then we must look at the object keys to learn whether the array is empty, keeping in mind that some of the object keys may not be unsigned integers. Again, there is no one right answer here. You have to decide what empty means.