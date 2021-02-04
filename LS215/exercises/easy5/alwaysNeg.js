//Write a function that takes a number as an argument. If the argument is a positive number, return the negative of that number. If the argument is a negative number, return it as-is.

console.log(negative(5));     // -5
console.log(negative(-3));    // -3
console.log(negative(0));     // -0

function negative(num) {
  //console.log(-Math.abs(num))
  return num >= 0 ? -num : num
}
