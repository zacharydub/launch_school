//Write a function that computes the difference between the square of the sum of the first n positive integers and the sum of the squares of the first n positive integers.

//calculate difference between:
//square of sum of first set of integers
//sum of squares of first set of integers
//input:integer || output: integer

//algo:
//create array of numbers from 1 to integer
//get square of sum by summing the numbers then squaring it
//reduce then square result
//get sum of squares by squaring all the elms then summing them
//iterate thru array and square each element - each time adding to a variable

function sumSquareDifference(num) {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }

  let squareSum = arr.reduce((arr, cur) => arr + cur) ** 2;

  let sum = 0;
  arr.forEach(elm => sum += elm ** 2);

  return squareSum - sum
}

console.log(sumSquareDifference(3));      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
console.log(sumSquareDifference(10));     // 2640
console.log(sumSquareDifference(1));      // 0
console.log(sumSquareDifference(100));    // 25164150
//not-integer inputs
//empty inputs
