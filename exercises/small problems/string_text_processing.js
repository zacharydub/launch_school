// #1
//Write a function that takes a string argument, and returns true if all of the alphabetic characters inside the string are uppercase; false otherwise. Ignore characters that are not alphabetic.
// console.log(isUppercase('t'));               // false
// console.log(isUppercase('T'));               // true
// console.log(isUppercase('Four Score'));      // false
// console.log(isUppercase('FOUR SCORE'));      // true
// console.log(isUppercase('4SCORE!'));         // true
// console.log(isUppercase(''));                // true

// function isLetter(letter) {
//   return (letter >= 'A' && letter <= 'Z') || (letter >= 'a' && letter <= 'z')
// }
// function isUppercase(string) {
//   if (!string) {
//     return true
//   }
//   for (let i = 0; i < string.length; i++) {
//     if (!isLetter(string[i])) {
//       continue;
//     }
//     if (string[i] >= 'A' && string[i] <= 'Z') {
//       continue;
//     }
//     if (string[i] >= 'a' && string[i] <= 'z') {
//       return false;
//       break;
//     }
//   }
//   return true;
// }

// // OR
// function isUppercase(string) {
//   return string.toUpperCase() === string;
// }

// #2
// Write a function that takes an array of strings, and returns an array of the same values with all vowels (a, e, i, o, u) removed.
// removeVowels(['abcdefghijklmnopqrstuvwxyz']);         // ["bcdfghjklmnpqrstvwxyz"]
// removeVowels(['green', 'YELLOW', 'black', 'white']);  // ["grn", "YLLW", "blck", "wht"]
// removeVowels(['ABC', 'AEIOU', 'XYZ']);                // ["BC", "", "XYZ"]

// function removeVowels(array) {
//   let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
// let resultArray = []

// let word = ''
// for (let indexElement = 0; indexElement < array.length; indexElement++) {
//   for (let elementLetter = 0; elementLetter < array[indexElement].length; elementLetter++) {
//     if (!vowels.includes(array[indexElement][elementLetter])) {
//       word += array[indexElement][elementLetter
//       ]
//     }
//   }
//   resultArray.push(word)
//   word = ''
// }


// let resultArray = array.map(each => {
//   let eachWord = ''
//   for (let wordIdx = 0; wordIdx < each.length; wordIdx++) {
//     if (!vowels.includes(each[wordIdx])) {
//       eachWord += each[wordIdx]
//     }
//   }
//   return eachWord
// })
// console.log(resultArray)
// }

// #3
//Write a function that takes a string and returns an object containing three properties: one representing the number of characters in the string that are lowercase letters, one representing the number of characters that are uppercase letters, and one representing the number of characters that are neither.
// letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
// letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
// letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
// letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }

// function letterCaseCount(string) {
//   let obj = { 'lowercase': 0, 'uppercase': 0, 'neither': 0 }
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] >= 'a' && string[i] <= 'z') {
//       obj.lowercase += 1
//     } else if (string[i] >= 'A' && string[i] <= 'Z') {
//       obj.uppercase += 1
//     } else {
//       obj.neither += 1
//     }
//   }
//   console.log(obj)
// }

// #4
//Write a function that takes a string as an argument, and returns that string with the first character of every word capitalized and all subsequent characters in lowercase.
// wordCap('four score and seven');       // "Four Score And Seven"
// wordCap('the javaScript language');    // "The Javascript Language"
// wordCap('this is a "quoted" word');    // 'This Is A "quoted" Word'

// function wordCap(string) {
//   let arr = string.split(" ")
//   let newArr = arr.map(elm => {
//     return elm = elm[0].toUpperCase() + elm.substring(1).toLowerCase()
//   })
//   let backtostring = newArr.join(" ")
//   console.log(backtostring)
// }

// #5
//Write a function that takes a string as an argument, and returns that string with every lowercase letter changed to uppercase and every uppercase letter changed to lowercase. Leave all other characters unchanged.
// swapCase('CamelCase');              // "cAMELcASE"
// swapCase('Tonight on XYZ-TV');      // "tONIGHT ON xyz-tv"

// function swapCase(string) {
//   let newStr = ''
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] >= 'A' && string[i] <= 'Z') {
//       newStr += string[i].toLowerCase()
//     } else if (string[i] >= 'a' && string[i] <= 'z') {
//       newStr += string[i].toUpperCase()
//     } else { newStr += string[i] }
//   }
//   console.log(newStr)
// }

// #6
//Write a function that takes a string as an argument, and returns that string with a staggered capitalization scheme. Every other character, starting from the first, should be capitalized and should be followed by a lowercase or non-alphabetic character. Non-alphabetic characters should not be changed, but should be counted as characters for determining when to switch between upper and lower case.
// console.log(staggeredCase('I Love Launch School!'));        // "I LoVe lAuNcH ScHoOl!"
// console.log(staggeredCase('ALL_CAPS'));                     // "AlL_CaPs"
// console.log(staggeredCase('ignore 77 the 444 numbers'));    // "IgNoRe 77 ThE 444 NuMbErS"
// //every char w even indexto be capitalized || every char w odd index to be lowercase. exclude non-alphabetic

// function staggeredCase(string) {
//   // let newStr = ''
//   // for (let i = 0; i < string.length; i++) {
//   //   if (i % 2 === 0) {
//   //     newStr += string[i].toUpperCase()
//   //   } else if (i % 2 === 1) {
//   //     newStr += string[i].toLowerCase()
//   //   }
//   // }
//   // console.log(newStr)

//   return string
//     .split("")
//     .map((char, index) => {
//       if (index % 2 === 0) {
//         return char.toUpperCase()
//       } else { return char.toLowerCase() }
//     })
//     .join("")
// }

// #7
//Modify the function from the previous exercise so it ignores non-alphabetic characters when determining whether it should uppercase or lowercase each letter. The non-alphabetic characters should still be included in the return value; they just don't count when toggling the desired case.

// console.log(staggeredCase("I Love Launch School!") === "I lOvE lAuNcH sChOoL!");
// console.log(staggeredCase("ALL CAPS") === "AlL cApS");
// console.log(
//   staggeredCase("ignore 77 the 444 numbers") === "IgNoRe 77 ThE 444 nUmBeRs"
// );

// function staggeredCase(string) {
//   let needUpper = true;

//   return string
//     .split("")
//     .map(char => {
//       char = char.toLowerCase();
//       if (char >= 'a' && char <= 'z') {
//         if (needUpper) {
//           needUpper = false;
//           return char.toUpperCase();
//         } else {
//           needUpper = true;
//           return char.toLowerCase();
//         }
//       } else {
//         return char;
//       }
//     })
//     .join("");
// }

//#8
//Write a function that takes a string as an argument, and returns an array that contains every word from the string, with each word followed by a space and the word's length. If the argument is an empty string or if no argument is passed, the function should return an empty array.

// console.log(wordLengths('cow sheep chicken'));
// // ["cow 3", "sheep 5", "chicken 7"]
// console.log(wordLengths('baseball hot dogs and apple pie'));
// // ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]
// console.log(wordLengths("It ain't easy, is it?"));
// // ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]
// console.log(wordLengths('Supercalifragilisticexpialidocious'));
// // ["Supercalifragilisticexpialidocious 34"]
// console.log(wordLengths(''));      // []
// console.log(wordLengths());        // []

// function wordLengths(string) {
//   if (!string) {
//     return []
//   }

//   return string
//     .split(" ")
//     .map(elm => elm + ' ' + elm.length)
// }

// #9
//Write a function that takes a word and a string of text as parameters, and returns an integer representing the number of times the word appears in the text.
// You may assume that the word and text inputs will always be provided, and that all word breaks are spaces. Thus, some words will include punctuation such as periods and commas.
// const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Sed quis autem vel est, iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?';

// console.log(searchWord('sed', text));     // 4
// searchWord('est', text);     // 0
// searchWord('est,', text);    // 2

// function searchWord(word, text) {
//   // let newText = text.toUpperCase()
//   // let arr = newText.toUpperCase().split(" ")
//   // let obj = {}
//   // arr.forEach(elm => {
//   //   if (obj[elm]) {
//   //     obj[elm] += 1
//   //   } else if (!obj[elm]) { obj[elm] = 1 }
//   // })
//   // console.log(obj[word])
//   let ucWord = word.toUpperCase();
//   let ucWordsInText = text.toUpperCase().split(' ');
//   let count = 0;
//   for (let index = 0; index < ucWordsInText.length; index += 1) {
//     if (ucWordsInText[index] === ucWord) {
//       count += 1;
//     }
//   }
//   console.log(count);
// }

//#10
//For this exercise, write a function that takes a word and a string of text as parameters, and returns the text with every instance of the word highlighted. To highlight a word, enclose the word with two asterisks ('**') on each side and change every letter of the word to uppercase (e.g., '**HIGHLIGHTEDWORD**').

// function searchWord(word, text) {
//   let ucWord = word.toUpperCase();
//   let textArray = text.split(" ")
//   let highlighted = []

//   for (let word = 0; word < textArray.length; word++) {
//     if (textArray[word].toUpperCase() === ucWord) {
//       textArray[word] = `**${ucWord}**`
//     }
//     highlighted.push(textArray[word])
//   }
//   return highlighted.join(" ")
// }

let arr2 = [1, 2, 3, 4, 5]
let arr1 = [5, 6, 7]

function check(array1, array2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true;
    }
  }
  return false;
}

console.log(check(arr1, arr2))