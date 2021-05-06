// #1
// Write a function that takes a string, doubles every character in the string, and returns the result as a new string.

// function repeater(str) {
//   let newStr = ''
//   for (let i = 0; i < str.length; i++) {
//     newStr += str[i] + str[i]
//   }
//   return console.log(newStr)
// }
// function repeater(str) {
//   let arr = []
//   for (let i = 0; i < str.length; i++) {
//     arr.push(str[i], str[i])
//   }
//   console.log(arr.join(""))
// }
// repeater('Hello');        // "HHeelllloo"
// repeater('Good job!');    // "GGoooodd  jjoobb!!"
// repeater('');             // ""

// #2
// Write a function that takes a string, doubles every consonant character in the string, and returns the result as a new string. The function should not double vowels ('a','e','i','o','u'), digits, punctuation, or whitespace.

// function doubleConsonants(str) {
//   const vowels = ['a', 'e', 'i', 'o', 'u']
//   let newStr = ''

//   for (let i = 0; i < str.length; i++) {
//     if (isLetter(str[i]) && !vowels.includes(str[i])) {
//       newStr += str[i] + str[i]
//     } else { newStr += str[i] }
//   }
//   return newStr
// }
// function isLetter(letter) {
//   return (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z')
// }

// doubleConsonants('String');          // "SSttrrinngg"
// doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
// doubleConsonants('July 4th');        // "JJullyy 4tthh"
// doubleConsonants('');                // ""

// #3
//Write a function that takes a positive integer as an argument, and returns that number with its digits reversed.

// function reverseNumber(num) {
//   let stringed = String(num)
//   let reversed = stringed.split("").reverse().join("")
//   console.log(Number(reversed))
// }
// reverseNumber(12345);    // 54321
// reverseNumber(12213);    // 31221
// reverseNumber(456);      // 654
// reverseNumber(12000);    // 21 -- Note that leading zeros in the result get dropped!
// reverseNumber(1);        // 1

// #4
// Write a function that takes a non-empty string argument, and returns the middle character(s) of the string. If the string has an odd length, you should return exactly one character. If the string has an even length, you should return exactly two characters.

// function centerOf(str) {
//   if (str.length % 2 === 0) {
//     console.log(str.substring(Math.floor((str.length - 1) / 2), (str.length + 2) / 2))
//   } else {
//     console.log(str.substring(Math.floor(str.length / 2), Math.ceil(str.length / 2)))
//   }
// }
// centerOf('I Love JavaScript'); // "a"
// centerOf('Launch School');     // " "
// centerOf('Launch');            // "un"
// centerOf('Launchschool');      // "hs"
// centerOf('x');                 // "x"

// #5
//Write a function that takes a number as an argument. If the argument is a positive number, return the negative of that number. If the argument is a negative number, return it as-is.

// function negative(num) {
//   let stringed = String(num)
//   if (stringed[0] === "-") {
//     console.log(num)
//   } else { console.log(`-${num}`) }
// }

// // //OR
// function negative(num) {
//   //   OR return Math.abs(num)*-1
//   return console.log(num < 0 ? num : -num)
// }
// negative(5);     // -5
// negative(-3);    // -3
// negative(0);     // -0


// #6
//Write a function that takes an integer argument, and returns an array containing all integers between 1 and the argument (inclusive), in ascending order.

// sequence(5);    // [1, 2, 3, 4, 5]
// sequence(3);    // [1, 2, 3]
// sequence(1);    // [1]

// function sequence(int) {

//   let arr = []
//   for (let count = 1; count <= int; count++) {
//     arr.push(count)
//   }
//   // let count = 1
//   // while (count <= int) {n`
//   //   arr.push(count)
//   //   count++
//   // }
//   console.log(arr)
// }

// #7
//Write a function that takes a string argument consisting of a first name, a space, and a last name, and returns a new string consisting of the last name, a comma, a space, and the first name.

// swapName('Joe Roberts');    // "Roberts, Joe"

// function swapName(str) {
//   return str.split(" ").reverse().join(", ")
// }

// #8
//Create a function that takes two integers as arguments. The first argument is a count, and the second is the starting number of a sequence that your function will create. The function should return an array containing the same number of elements as the count argument. The value of each element should be a multiple of the starting number.
// sequence(5, 1);          // [1, 2, 3, 4, 5]
// sequence(4, -7);         // [-7, -14, -21, -28]
// sequence(3, 0);          // [0, 0, 0]
// sequence(0, 1000000);    // []

// function sequence(count, startNum) {
//   let arr = []
//   for (let num = 1; num <= count; num++) {
//     arr.push(startNum * num)
//   }
//   console.log(arr)
// }

// #9
//Write a function that takes a string argument, and returns a new string containing the words from the string argument in reverse order.

// reverseSentence('');                       // ""
// reverseSentence('Hello World');            // "World Hello"
// reverseSentence('Reverse these words');    // "words these Reverse"

// function reverseSentence(string) {
//   console.log(string.split(" ").reverse().join(" "))
// }

// #10
//Write a function that takes a string argument containing one or more words, and returns a new string containing the words from the string argument. All five-or-more letter words should have their letters in reverse order. The string argument will consist of only letters and spaces. Words will be separated by a single space.
// reverseWords('Professional');             // "lanoisseforP"
// reverseWords('Walk around the block');    // "Walk dnuora the kcolb"
// reverseWords('Launch School');            // "hcnuaL loohcS"

// //input/output:string. Reverse letters of any words 5+ letters. Convert string to array, then convert 5+ array string elements to sub-array,reverse, then convert sub-array back to array
// // function reverseWords(string) {
// //   let arr = string.split(" ")
// //   // let newArr = arr.map(each => {
// //   //   if (each.length >= 5) {
// //   //     return each = each.split("").reverse().join("")
// //   //   } else { return each }
// //   // })
// //   //OR
// //   // for (let i = 0; i < arr.length; i++) {
// //   //   if (arr[i].length >= 5) {
// //   //     arr[i] = arr[i].split("").reverse().join("")
// //   //   }
// //   // }
// //   let stringed = newArr.join(" ")
// //   console.log(stringed)
// // }

// function reverseWords(string) {
//   let arr = string.split(" ")
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].length >= 5) {
//       arr[i] = arr[i].split("").reverse().join("")
//     }
//   }
//   return arr.join(" ")
// }

// #11
//Write a function that takes an Array as an argument, and reverses its elements in place; that is, mutate the Array passed into this method. The return value should be the same Array object.

// function reverse(array) {
//   let newArr = []
//   for (let i = array.length; i > 0; i--) {
//     newArr.push(array.pop())
//   }
//   for (let i = 0; i < newArr.length; i++) {
//     array.push(newArr[i])
//   }
//   return array
// }
// reverse([1, 2, 3, 4])
// let list = [1, 2, 3, 4];
// let result = reverse(list);
// console.log(result); // logs [4,3,2,1]
// console.log(list === result); // logs true

// let list1 = ["a", "b", "c", "d", "e"];
// let result1 = reverse(list1);
// console.log(result1); // logs  ["e", "d", "c", "b", "a"]
// console.log(list1 === result1); // logs true

// let list2 = ["abc"];
// let result2 = reverse(list2);
// console.log(result2); // logs  ["abc"]
// console.log(list2 === result2); // logs true

// let list3 = [];
// let result3 = reverse(list3);
// console.log(result3); // logs []
// console.log(list3 === result3); // logs true

// // OR
// function reverse(array) {
//   let leftIndex = 0;
//   let rightIndex = array.length - 1;

//   while (leftIndex < array.length / 2) {
//     [array[leftIndex], array[rightIndex]] =
//       [array[rightIndex], array[leftIndex]];
//     leftIndex += 1;
//     rightIndex -= 1;
//   }
//   return array;
// }


// #12
//Write a function that takes a string as argument, and returns true if all parentheses in the string are properly balanced, false otherwise. To be properly balanced, parentheses must occur in matching '(' and ')' pairs.

function isBalanced(string) {
  let parens = 0;
  for (let idx = 0; idx < string.length; idx++) {
    if (string[idx] === "(") {
      parens += 1;
    } else if (string[idx] === ")" || "]" || "}") {
      parens -= 1;
    }
    if (parens < 0) return false;
  }
  return parens === 0;
};

console.log(isBalanced("What (is) this?") === true);
console.log(isBalanced("What is) this?") === false);
console.log(isBalanced("What (is this?") === false);
console.log(isBalanced("((What) (is this))?") === true);
console.log(isBalanced("((What)) (is this))?") === false);
console.log(isBalanced("Hey!") === true);
console.log(isBalanced(")Hey!(") === false);
console.log(isBalanced("What ((is))) up(") === false);

console.log(isBalanced("What [is] this?") === true);
console.log(isBalanced("What is} this?") === false);
console.log(isBalanced("What [is this?") === false);
console.log(isBalanced("{{What} {is this}}?") === true);
console.log(isBalanced("{{What}} {is this}}?") === false);
console.log(isBalanced("Hey!") === true);
console.log(isBalanced(")Hey!(") === false);
console.log(isBalanced("What ((is))) up(") === false);