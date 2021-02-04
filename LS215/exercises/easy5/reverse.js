//Write a function that takes a positive integer as an argument, and returns that number with its digits reversed.

//algo
//convert input number to string
//convert string to array
//reverse array
//join array
//convert to number
//return number
console.log(reverseNumber(12345));    // 54321
console.log(reverseNumber(12213));    // 31221
console.log(reverseNumber(456));      // 654
console.log(reverseNumber(12000));    // 21 -- Note that zeros get dropped!
console.log(reverseNumber(1));        // 1

console.time('timer')
//function reverseNumber(num) {
//
//  return Number(String(num).split('').reverse().join(''))
//
//}


//MORE EFFICIENT:
//10x as fast
function reverseNumber(integer) {
  var result = 0;

  while (integer > 0) {
    let remainder = integer % 10;
    integer = (integer - remainder) / 10;

    result *= 10;
    result += remainder;
  }

  return result;
};
console.timeEnd('timer')
