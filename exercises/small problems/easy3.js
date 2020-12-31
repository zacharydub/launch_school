const readlineSync = require('readline-sync');

// #1 - Write a function that takes a string argument and returns a new string that contains the value of the original string with all consecutive duplicate characters collapsed into a single character.

// function crunch(str) {
//   let newStr = ''
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] !== str[i + 1]) {
//       newStr += str[i]
//     }
//   }
//   return newStr
// }
// console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
// console.log(crunch('4444abcabccba'));              // "4abcabcba"
// console.log(crunch('ggggggggggggggg'));            // "g"


// #2 - Write a function that will take a short line of text, and write it to the console log within a box.

// function logInBox(message) {
//   let horizontalRule = `+${"-".repeat(message.length + 2)}+`;
//   let emptyLine = `|${" ".repeat(message.length + 2)}|`;
//   console.log(horizontalRule);
//   console.log(emptyLine);
//   console.log(`| ${message} |`);
//   console.log(emptyLine);
//   console.log(horizontalRule);
// }

// #3 - Write a function that takes one argument, a positive integer, and returns a string of alternating '1's and '0's, always starting with a '1'. The length of the string should match the given integer.
// Examples:
// stringy(6);    // "101010"

// function stringy(int) {
//   let result = ""
//   for (let i = 0; i < int; i++) {
//     let number = ((i % 2) === 0) ? 1 : 0
//     result += number
//   }
//   return result
// }
// console.log(stringy(0))
// console.log(stringy(1))

// #4 - Write a function that calculates and returns the index of the first Fibonacci number that has the number of digits specified by the argument.
// function findFibonacciIndexByLength(length) {
//   let first = 1;
//   let second = 1;
//   let index = 2;
//   let fibonacci;

//   do {
//     fibonacci = first + second;
//     index += 1;
//     first = second;
//     second = fibonacci;
//   } while (String(fibonacci).length < length);

//   return index;
// }
// console.log(findFibonacciIndexByLength(10));      // 45

// #5 Write a function that takes a positive integer, n, as an argument, and logs a right triangle whose sides each have n stars. The hypotenuse of the triangle (the diagonal side in the images below) should have one end at the lower-left of the triangle, and the other end at the upper-right.

// function triangle(height) {
//   let spaces = height - 1;
//   let stars = 1;
//   while (height > 0) {
//     console.log(`${" ".repeat(spaces)}${"*".repeat(stars)}`);
//     spaces -= 1;
//     stars += 1;
//     height -= 1;
//   }
// }

// #6
// console.log("pick a noun")
// let noun = readlineSync.question()
// console.log("pick a verb")
// let verb = readlineSync.question()
// console.log("pick an adjective")
// let adjective = readlineSync.question()
// console.log("pick an adverb")
// let adverb = readlineSync.question()
// console.log(`There once was a ${noun} who loved to ${verb}. The ${noun} was${adjective} and ran ${adverb}`)

// #7
// console.log(twice(37));          // 74
// console.log(twice(44));          // 44
// console.log(twice(334433));      // 668866
// console.log(twice(444));         // 888

// function isDouble(num) {
//   let stringed = String(num)
//   let center = Math.floor(stringed.length / 2)
//   let left = stringed.substring(0, center)
//   let right = stringed.substring(center)

//   return left === right
// }

// function twice(num) {
//   if (!isDouble(num)) {
//     return num * 2
//   } else { return num }
// }

// #8
// Write a function that determines the mean (average) of the three scores passed to it, and returns the letter associated with that grade.
// console.log(getGrade(95, 90, 93));    // "A"
// console.log(getGrade(50, 50, 95));    // "D"

// function getGrade(num1, num2, num3) {
//   let avg = ((num1 + num2 + num3) / 3)
//   console.log(avg)
//   if (avg >= 90 && avg <= 100) {
//     return 'A'
//   } else if (avg >= 80 && avg <= 90) {
//     return 'B'
//   } else if (avg >= 70 && avg <= 80) {
//     return 'C'
//   } else if (avg >= 60 && avg <= 70) {
//     return 'D'
//   } else if (avg <= 60) {
//     return 'F'
//   }
// }

// #9
// Given a string that consists of some words and an assortment of non-alphabetic characters, write a function that returns that string with all of the non-alphabetic characters replaced by spaces. If one or more non-alphabetic characters occur in a row, you should only have one space in the result (i.e., the result string should never have consecutive spaces).
//inpt:string | output:string || loop through the string, checking if each character is alphabetical or not. If not, compare with following character - if that is alphabetical, then jst a space for the non. If 2nd isnt alphabetical, then jst 1 space for both
// let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// function cleanUp(str) {
//   let newstr = ''
//   for (let i = 0; i < str.length; i++) {
//     if (alphabet.includes(str[i].toLowerCase())) {
//       newstr += str[i]
//     } else if (!alphabet.includes(str[i].toLowerCase())) {
//       if (!alphabet.includes(str[i + 1])) {
//         newstr += ""
//       } else { newstr += " " }
//     }
//   }
//   return newstr
// }
// console.log(cleanUp("---what's my +*& line?"))

// # 10
// Write a function that takes a year as input and returns the century. The return value should be a string that begins with the century number, and ends with 'st', 'nd', 'rd', or 'th' as appropriate for that number.
// New centuries begin in years that end with 01. So, the years 1901 - 2000 comprise the 20th century.
// century(2000);        // "20th"
// century(2001);        // "21st"
// century(1965);        // "20th"
// century(256);         // "3rd"
// century(5);           // "1st"

// function century(year) {
//   let centuryNumber = Math.floor(year / 100) + 1;
//   if (year % 100 === 0) {
//     centuryNumber -= 1;
//   }
//   return String(centuryNumber) + centurySuffix(centuryNumber);
// }
// function centurySuffix(centuryNumber) {
//   if (catchWithTh(centuryNumber % 100)) {
//     return 'th';
//   }
//   let lastDigit = centuryNumber % 10;
//   switch (lastDigit) {
//     case 1: return 'st';
//     case 2: return 'nd';
//     case 3: return 'rd';
//     default: return 'th';
//   }
// }
// function catchWithTh(lastTwo) {
//   return lastTwo === 11 || lastTwo === 12 || lastTwo === 13;
// }



