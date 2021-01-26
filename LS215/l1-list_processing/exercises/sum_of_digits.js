//Write a function that takes one argument, a positive integer, and returns the sum of its digits. Do this without using for, while, or do...while loops - instead, use a series of method calls to perform the sum.

console.log(sum(23));           // 5
console.log(sum(496));          // 19
console.log(sum(123456789));    // 45

function sum(num) {
  let arr = String(num).split('');
  return arr.reduce((acc, cur) => Number(acc) + Number(cur))
}
//convert input to string then convert to array
//iterate thru array and sum the elements
