//Write a function that takes one argument, a positive integer, and returns a string of alternating '1's and '0's, always starting with a '1'. The length of the string should match the given integer.

console.log(stringy(6));    // "101010"
console.log(stringy(9));    // "101010101"
console.log(stringy(4));    // "1010"
console.log(stringy(7));    // "1010101"

function stringy(num) {
  return num % 2 === 0 ? '10'.repeat(num / 2) : '10'.repeat(Math.floor(num / 2)) + '1';
}

//input: integer || output: string sequence of 1s and 0s

//rules:
//1s and 0s alternate
//sequence starts with 1 - so given 1-> 1|| given 2 -> 10 || given 3 -> 101

//if even, repeat 10 * input num / 2
//if odd, repeat 10 * Math.floor(input num/2) + '1'
