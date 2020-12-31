// #1
//Write a function that rotates an array by moving the first element to the end of the array. Do not modify the original array.
// If the input is not an array, return undefined.
// If the input is an empty array, return an empty array.
// Review the test cases below, then implement the solution accordingly.
// console.log(rotateArray([7, 3, 5, 2, 9, 1]));       // [3, 5, 2, 9, 1, 7]
// console.log(rotateArray(['a', 'b', 'c']));          // ["b", "c", "a"]
// console.log(rotateArray(['a']));                    // ["a"]
// console.log(rotateArray([1, 'a', 3, 'c']));         // ["a", 3, "c", 1]
// console.log(rotateArray([{ a: 2 }, [1, 2], 3]));    // [[1, 2], 3, { a: 2 }]
// console.log(rotateArray([]));                       // []
// // return `undefined` if the argument is not an array
// console.log(rotateArray());                         // undefined
// console.log(rotateArray(1));                        // undefined

// function rotateArray(array) {
//   if (!Array.isArray(array)) {
//     return undefined
//   }
//   if (array.length === 0) {
//     return []
//   }

//   // let copy = array.slice()
//   // let first = copy.shift() // 1st elm
//   // copy.push(first)
//   // return copy
//   //OR
//   return array.slice(1).concat(array[0]);
// }

// #2
//Write a function that rotates the last count digits of a number. To perform the rotation, move the first of the digits that you want to rotate to the end and shift the remaining digits to the left.

// console.log(rotateRightmostDigits(735291, 1));      // 735291
// console.log(rotateRightmostDigits(735291, 2));      // 735219
// console.log(rotateRightmostDigits(735291, 3));      // 735912
// console.log(rotateRightmostDigits(735291, 4));      // 732915
// console.log(rotateRightmostDigits(735291, 5));      // 752913
// console.log(rotateRightmostDigits(735291, 6));      // 352917

// function rotateRightmostDigits(number, count) {
//   let arr = String(number).split('')
//   let removeItemIndex = arr.length - count
//   let removed = arr.splice(removeItemIndex, 1)
//   arr.push(removed)
//   return Number(arr.join(''))
// }

// // #3
// //Take the number 735291 and rotate it by one digit to the left, getting 352917. Next, keep the first digit fixed in place and rotate the remaining digits to get 329175. Keep the first two digits fixed in place and rotate again to get 321759. Keep the first three digits fixed in place and rotate again to get 321597. Finally, keep the first four digits fixed in place and rotate the final two digits to get 321579. The resulting number is called the maximum rotation of the original number.
// // Write a function that takes an integer as an argument, and returns the maximum rotation of that integer.
// maxRotation(735291);          // 321579
// maxRotation(3);               // 3
// maxRotation(35);              // 53
// maxRotation(105);             // 15 -- the leading zero gets dropped
// maxRotation(8703529146);      // 7321609845

// function maxRotation(integer) {
//   let digits = String(integer).split('').length
//   // let first = rotateRightmostDigits(integer, digits)
//   //i.e 1234 - rotateRightmostDigits(123456,6) => 234561
//   //then rotateRightmostDigits(234561,5)=>245613
//   //then then rotateRightmostDigits(245613,4)=>246135
//   //then (246135,3)=>246351
//   //then (246351,2)=>246315 is max rotate
//   //decrement digits til 2 inclusive - set digits
//   for (let i = digits; i >= 2; i--) {
//     integer = rotateRightmostDigits(integer, i)
//   }
//   console.log(integer)
// }

// #4
// function minilang(program) {
//   let stack = [];
//   let register = 0;
//   program.split(" ").forEach(token => {
//     switch (token) {
//       case "ADD":
//         register += stack.pop();
//         break;
//       case "DIV":
//         register = Math.floor(register / stack.pop());
//         break;
//       case "MULT":
//         register *= stack.pop();
//         break;
//       case "MOD":
//         register = Math.floor(register % stack.pop());
//         break;
//       case "SUB":
//         register -= stack.pop();
//         break;
//       case "PUSH":
//         stack.push(register);
//         break;
//       case "POP":
//         register = stack.pop();
//         break;
//       case "PRINT":
//         console.log(register);
//         break;
//       default:
//         register = Number(token);
//     }
//   });
//   return register;
// }

// #5
//Write a function that takes a sentence string as an argument, and returns that string with every occurrence of a "number word" — 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' — converted to its corresponding digit character.
// wordToDigit('Please call me at five five five one two three four. Thanks.');
// "Please call me at 5 5 5 1 2 3 4. Thanks."

//associate each number with its corresponding word
//loop thru string and if string =obj[key], print obj[key]
// const digits = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'zero': 0 }
// // let objArr = Object.entries(digits)
// // let flatten = objArr.flat()

// function wordToDigit(string) {
//   Object.keys(digits).forEach()
//   let arr = string.split(" ")
//   let newStr = ''
//   for (let i = 0; i < arr.length; i++) {
//     if (flatten.includes(arr[i])) {
//       newStr += flatten[arr[i + 1]]
//     } else {
//       newStr += arr[i]
//     }
//   }
//   return newStr
// }

// #6

