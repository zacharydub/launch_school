const readlineSync = require('readline-sync');

//#1
// Build a program that randomly generates Teddy's age, and logs it to the console. Have the age be a random number between 20 and 120 (inclusive).
// Example Output:
// Teddy is 69 years old!
// Math.ceil(Math.random() * 100) + 20

// function randomBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// #2
// Write a program that solicits six numbers from the user, then logs a message that describes whether or not the sixth number appears amongst the first five numbers.
// let arr = []
// for (let i = 1; i <= 5; i++) {
//   console.log("Enter a number")
//   arr.push(readlineSync.prompt())
// }
// console.log('Enter final numer')
// let sixth = readlineSync.prompt()

// if (arr.includes(sixth)) {
//   console.log(`The number ${sixth} appears in ${[...arr]}`)
// } else if (!arr.includes(sixth)) { console.log(`The number ${sixth} does not appear in ${[...arr]}`) }

// #3
// Build a program that logs when the user will retire and how many more years the user has to work until retirement.

// Example:
// What is your age? 30
// At what age would you like to retire? 70
// It's 2017. You will retire in 2057.
// You have only 40 years of work to go!

// console.log("What is your age?")
// let age = Number(readlineSync.question())
// // let currentAge = Number(readlineSync.question("What is your age?\n"));
// console.log("At what age would you like to retire?")
// let retireAge = Number(readlineSync.question())
// let date = new Date().getFullYear()
// let yearsToGo = retireAge - age
// console.log(`It's ${date}. You will retire in ${date + yearsToGo}.`)
// console.log(`You have only ${yearsToGo} years of work to go!`)

// #4
// Write a function that returns true if the string passed as an argument is a palindrome, or false otherwise. A palindrome reads the same forwards and backwards. For this problem, the case matters and all characters matter.

//input:string | output:boolean. Input->output based on palidrome. How to check if a word is a palindrome? Reads the same forward and backward. convert to array and reverse then convert back to string.

// function isPalindrome(string) {
//   let reversedString = string.split("").reverse().join("")
//   return string === reversedString
// }
// console.log(isPalindrome('madam'));               // true
// console.log(isPalindrome('Madam'));               // false (case matters))
// console.log(isPalindrome("madam i'm adam"))
// console.log(isPalindrome('356653'))

// #5
//how to get only the alphanmeric char - loop through and only use the char between a and z

// function isRealPalindrome(newstring) {
//   newstring = newstring.toLowerCase()
//   let newStr = ''
//   for (let i = 0; i < newstring.length; i++) {
//     if ((newstring[i] >= 'a' && newstring[i] <= 'z') || (newstring[i] >= '0' && newstring[i] <= '9')) {
//       newStr += newstring[i]
//     }
//   }
//   console.log(newStr)
//   console.log(isPalindrome(newStr))
// }
// isRealPalindrome('madam')
// isRealPalindrome('Madam');
// isRealPalindrome("madam i'm adam")
// isRealPalindrome('356653')

// #6
// Write a function that returns true if its integer argument is palindromic, or false otherwise. A palindromic number reads the same forwards and backwards.

// Examples:
// isPalindromicNumber(0345430);        // true
// isPalindromicNumber(123210);       // false
// isPalindromicNumber(22);           // true
// isPalindromicNumber(5);            // true

// function isPalindromicNumber(integer) {
//   let stringed = String(integer)
//   let reversedString = stringed.split("").reverse().join("")
//   return console.log(stringed === reversedString)
// }

// #7
//Write a function that takes an array of numbers, and returns an array with the same number of elements, with each element's value being the running total from the original array.

//input:array of nums || output: new array with running totals. How to get running totals. Loop through array and add together the elements and send the sum to new array..How to use reduce method here? Looks like map method, maybe a nested method

// function runningTotal(array) {
//   let resultArray = []
//   let sum = 0
//   for (let i = 0; i < array.length; i++) {
//     resultArray.push(sum += array[i])
//   }
//   return console.log(resultArray)
// }
// runningTotal([1, 2, 3, 4, 5]) // want [1,3,6,10,15]

// #8 Write a function that takes a string consisting of zero or more space separated words, and returns an object that shows the number of words of different sizes.
// Words consist of any sequence of non-space characters.

// Examples:
// wordSizes('Four score and seven.')// { "3": 1, "4": 1, "5": 1, "6": 1 }
// wordSizes('Hey diddle diddle, the cat and the fiddle!')
// wordSizes("What's up doc?")
// wordSizes('')

// function wordSizes(string) {
//   let array = string.split(" ")
//   let object = {}
//   for (let i = 0; i < array.length; i++) {
//     let wordSize = array[i].length
//     if (wordSize === 0) {
//       continue;
//     }
//     if (object[wordSize]) {
//       object[wordSize] += 1
//     } else { object[wordSize] = 1 }
//   }
//   return console.log(object)
// }

// #9
// Modify the wordSizes function from the previous exercise to exclude non-letters when determining word size. For instance, the word size of "it's" is 3, not 4.
// function wordSizes(words) {
//   let wordsArray = words.split(' ');
//   let count = {};

//   for (let idx = 0; idx < wordsArray.length; idx += 1) {
//     let cleanWordSize = removeNonLetters(wordsArray[idx].toLowerCase()).length;
//     if (cleanWordSize === 0) {
//       continue;
//     }

//     count[cleanWordSize] = count[cleanWordSize] || 0;
//     count[cleanWordSize] += 1;
//   }

//   return console.log(count);
// }

// function removeNonLetters(string) {
//   let result = '';

//   for (let idx = 0; idx < string.length; idx += 1) {
//     if (isLetter(string[idx])) {
//       result += string[idx];
//     }
//   }

//   return result;
// }

// function isLetter(char) {
//   return char >= 'a' && char <= 'z';
// }

// #10
// Given a string of words separated by spaces, write a function that swaps the first and last letters of every word.

//input:string || ouput:string. Swap 1st and last letter of each word. Isolate each word by convering to array. Then, for each array element, swap 1st and last char

// function swap(words) {
//   let wordsArray = words.split(' ');

//   for (let idx = 0; idx < wordsArray.length; idx += 1) {
//     wordsArray[idx] = swapFirstLastCharacters(wordsArray[idx]);
//   }

//   return wordsArray.join(' ');
// }

// function swapFirstLastCharacters(word) {
//   if (word.length === 1) {
//     return word;
//   }

//   return word[word.length - 1] + word.slice(1, -1) + word[0];
// }

// swap('Oh what a wonderful day it is');  // "hO thaw a londerfuw yad ti si"
// swap('Abcde');                          // "ebcdA"
// swap('a');                              // "a"