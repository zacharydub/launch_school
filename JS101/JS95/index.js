//arrays

//he following code uses a randomNumberBetween function to generate a number between its first and second arguments. It uses a while loop to try to generate a number greater than 2.
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let tries = 0;
let result = randomNumberBetween(1, 6);
tries += 1;
while (result <= 2) {
  result = randomNumberBetween(1, 6);
  tries += 1;
}
console.log('It took ' + String(tries) + ' tries to get a number greater than 2');

//Refactor the code so that you don't need to call randomNumberBetween from two different locations, lines 6 and 10. Do not change the arguments you pass to randomNumberBetween.
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let tries = 0;
let result;
do {
  result = randomNumberBetween(1, 6);
  tries += 1;
} while (result <= 2);

console.log('It took ' + String(tries) + ' tries to get a number greater 2');
//The ideal use case for do...while occurs when you need to execute some code at least once like we do here.



//iterating over an array

//forEach- performs simple iteration and returns undefined
//vs
//map - transforms an array's elements and returns a new array with the transformed values.

//Filter - returns a new array that includes all elements from the calling array for which the callback returns a truthy value
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2]
numbers.filter(num => num > 4)
  = [5, 6, 7, 8, 9, 10]

numbers
  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2]

//Reduce - takes two arguments: a callback function and a value that initializes something called the accumulator. The callback function takes two arguments as well: an element from the array, the current value of the accumulator. It returns a value that will be used as the accumulator in the next invocation of the callback.
let arr = [2, 3, 5, 7]
arr.reduce((accumulator, element) => accumulator + element, 0)
  = 17

arr.reduce((accumulator, element) => accumulator * element, 1)
  = 210

//   The first of the invocations computes the sum of all the values in the array, e.g., 2 + 3 + 5 + 7. To get us started, we initialize the accumulator to 0. Thus, on the first invocation of the callback function, accumulator is 0 and element is 2. The callback returns 2, which becomes the new accumulator value when we invoke the callback again, this time with the element 3. That invocation, in turn, returns 5. This process continues until the final return value is 17.
// The second invocation of reduce computes the product of the numbers in the array (2 * 3 * 5 * 7), starting out with 1 as the accumulator. (If we started with 0 as the accumulator, the final return value would be 0 since 0 times anything is 0.)

// The reduce function isn't limited to working with numbers: you can also use it with strings, objects, arrays: anything. Here's an example with strings:

let strings = ['a', 'b', 'c', 'd']
strings.reduce((accumulator, element) => {
  return accumulator + element.toUpperCase()
}, '');
//  'ABCD'


// array_equality.js
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

console.log(arraysEqual([1, 2, 3], [1, 2, 3])); // logs true
console.log(arraysEqual([1, 2, 3], [4, 5, 6])); // logs false
console.log(arraysEqual([1, 2, 3], [1, 2, 3, 4])); // logs false

//slice -

let fruits = ['mango', 'orange', 'banana', 'pear', 'apple']
fruits.slice(1, 3)
  = ['orange', 'banana']

fruits.slice(2) // second argument defaults to rest of array
  = ['banana', 'pear', 'apple']

fruits.slice() // no arguments duplicates the array
  = ['mango', 'orange', 'banana', 'pear', 'apple']

// If you omit the second argument, slice returns the rest of the array starting with the index given by the first argument. With the second argument, it returns the elements up to but excluding that index. (Contrast this detail with how splice treats its second argument.) If you don't provide any arguments at all, slice returns a copy of the entire array: that is, it returns a new array with the same elements as the original. That's useful when you need to use a destructive method on an array that you don't want to modify.


//select only the even numbers from this NESTED array:

let myArray = [
  [1, 3, 6, 11],
  [4, 2, 4],
  [9, 17, 16, 0],
];
//solution:
for (let i = 0; i < myArray.length; i += 1) {
  for (let j = 0; j < myArray[i].length; j += 1) {
    let value = myArray[i][j];
    if (value % 2 === 0) {
      console.log(value); // => 6, 4, 2, 4, 16, 0
    }
  }
}

// MAP function to create a new array that contains one element for each element in the original array. If the element is an even value, then the corresponding element in the new array should contain the string 'even'; otherwise, the element in the new array should contain 'odd'.

let newArray = myArray.map(function (value) {
  if (value % 2 === 0) {
    return 'even';
  } else {
    return 'odd';
  }
});

// Use map and filter to first determine the lengths of all the elements in an array of string values, then discard the even values (keep the odd values).

let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];
console.log(oddLengths(arr)); // => [1, 5, 3]

//---------
//solution
function oddLengths(arr) {
  let filteredNumbersArray = arr.map((letters) => {
    return letters.length;
  }).filter((number) => {
    return number % 2 === 1;
  });

  return filteredNumbersArray;
}

let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];
console.log(oddLengths(arr));

//solution using reduce method
function oddLengths(arr) {
  return arr.reduce((filteredNumbersArray, letters) => {
    let length = letters.length;
    if (length % 2 === 1) {
      filteredNumbersArray.push(length);
    }

    return filteredNumbersArray;
  }, []);
}
let arr = ['a', 'abcd', 'abcde', 'abc', 'ab'];
console.log(oddLengths(arr));



// Use reduce to compute the sum of the squares of all of the numbers in an array:

let numbers = [3, 5, 7];
console.log(sumOfSquares(numbers)); // => 83

//solution
function sumOfSquares(numbers) {
  return numbers.reduce((accumulator, number) => {
    return accumulator + number * number;
  }, 0);
}

let numbers = [3, 5, 7];
console.log(sumOfSquares(numbers)); // => 83