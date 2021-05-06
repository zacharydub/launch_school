const { RuleTester } = require("eslint")



//video 1

//given integer input, find next biggest number compriss of smae digits. If no such number exists, return -1

// function sameDigits(num1, num2) {
//   let array1 = String(num1).split("").sort()
//   let array2 = String(num2).split("").sort()
//   if (array1.length !== array2.length) {
//     return false
//   }
//   for (let i = 0; i < array1.length; i++) {
//     if (array1[i] !== array2[i]) {
//       return false
//     }
//   }
//   return true
// }

// function findNum(integer) {
//   let digits = String(integer).split('').length
//   let integer2 = integer

//   while (String(integer2).split('').length <= digits) {
//     integer2 += 1
//     if (sameDigits(integer, integer2)) {
//       return integer2
//     }
//   }
//   return -1
// }
// console.log(findNum(12))
// console.log(findNum(531))
// console.log(findNum(2017))
// console.log(findNum(123456789))

//write function that returns true if porttion of str1 chracters can be rearranged to mtch str2, otherwise returns false. only lowercase
//example: str1 is "worldsd", str2 is"world" - returns true
//example2: str1 is "javssss", str2 = "java" - returns false

// function scramble(str1, str2) {
//   let array = str1.split('')
//   for (let i = 0; i < str2.length; i++) {
//     if (!array.includes(str2[i])) {
//       return false
//     }
//   }
//   return true
// }
// console.log(scramble('javaaass', 'java'))
// console.log(scramble('worldas', 'world'))
// console.log(scramble('katas', 'steak'))
// console.log(scramble('katas', 'staka'))


//video 2

//given nonempty string chckeci if tcan be constructed by taking a substring of it and appending multiple cipies of the substring together. 
//example: input:'abab' || output: true|| why: it's the substring 'ab' twice.
//example2: input:aba|| output: false

// console.log(name("abab") === true) // true
// console.log(name("aba") === false) // true
// console.log(name("aabaaba") === false) // true
// console.log(name("abaababaab") === true) // true
// console.log(name("abcabcabcabc") === true) // true

// function name(string) {
//   let substring = ''
//   let indexMax = Math.floor(string.length / 2)

//   for (let i = 0; i < indexMax; i++) {
//     substring = string.slice(0, i + 1)

//     while (substring.length < string.length) {
//       substring += substring
//     }
//     if (substring === string) {
//       return true
//     }
//   }
//   return false
// }

// ***toreview***
//given array of strings made only from lowercase letters, return array of all chars that show up in all string within given array (incl duplicates). i. if char occurs 3 times in all strings but not 4 time, you need t include that char 3 times in final answer
// console.log(compareChars(['a', 'b'])) // []
// console.log(compareChars(['ab', 'bc'])) // ['b']
// console.log(compareChars(['bella', 'label', 'roller'])) // ['e','l','l']
// console.log(compareChars(['cool', 'lock', 'cook'])) // ['c','o']
// console.log(compareChars(['hello', 'goodbye', 'booya', 'random']))// ['o']

// function compareChars(array) {
//   let common = array[0];
//   for (let i = 1; i < array.length; i++) {
//     common = getCommon(common, array[i].split(''));
//   }
//   return common;
// }

// function getCommon(word1, word2) {
//   let commons = [];
//   let word2copy = word2.slice()

//   for (let i = 0; i < word1.length; i++) {
//     for (let j = 0; j < word2.length; j++) {
//       if (word1[i] === word2[j]) {
//         if (word2copy.indexOf(word1[i]) !== -1) {
//           commons.push(word1[i]);
//           word2copy.splice(word2copy.indexOf(word1[i]), 1);
//           break;
//         }
//       }
//     }
//   }
//   return commons
// }


//video #3
//given 2 strings, your job is to find out if there is a sbustring hat appears in both strings. Return true is yes, false if not. Only care about substrings longer than 1 letter

// console.log(substringTest('something', 'fun') === false)
// console.log(substringTest('something', 'home') === true)
// console.log(substringTest('', 'something') === false)
// console.log(substringTest('BANANA', 'banana') === true)
// console.log(substringTest('test', 'lllt') === false)
// console.log(substringTest('', '') === false)
// console.log(substringTest('1234567', '541265') === true)
// console.log(substringTest('supercalifragilisticexpialidocious', 'SoundOfItsAtrocious') === true)

// function substringTest(str1, str2) {
//   let subs1 = substrings(str1)
//   let subs2 = substrings(str2)

//   for (let i = 0; i < subs1.length; i++) {
//     if (subs2.includes(subs1[i])) {
//       return true;
//     }
//   }
//   return false;
// }

// function substrings(string) {
//   string = string.toLowerCase()
//   let subs = []

//   for (let i = 0; i < string.length; i++) {
//     for (let j = i + 1; j <= string.length; j++) {
//       subs.push(string.slice(i, j))
//     }
//   }
//   return subs.filter(each => each.length > 1)
// }



// video 4

//write function to find longest common prefix string amonst array of strings. If no common prefix, return empty string
//ex: inp: ['flower','flow','flight'] +> 'fl'

// console.log(commonPrefix(['flower', 'flow', 'flight']) === 'fl')
// console.log(commonPrefix(['dog', 'racecar', 'car']) === '')
// console.log(commonPrefix(['interspecies', 'interstellar', 'interstate']) === 'inters')
// console.log(commonPrefix(['throne', 'dungeon']) === '')
// console.log(commonPrefix(['throne', 'throne']) === 'throne')
// function commonPrefix(array) {
//   let arrCopy = array.slice()
//   let sorted = arrCopy.sort((a,b)=>a-b)
// let shortest = sorted.shift()

//   while (shortest.length > 0) {
//     if (arrCopy.every(item => item.startsWith(shortest))) {
//       return shortest
//     }
//     shortest = shortest.slice(0, shortest.length - 1)
//   }
//   return shortest
// }

//Justin Lo from 9/15 study session

//// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:

// All given inputs are in lowercase letters a-z.

// input: [strs]
// output: string (the longest common prefix)

// rules: return the longest common prefix among ALL elements of an input array
//        if no common prefix, RETURN empty string ""
//        inputs are given in lowercase letter so we don't have to account for case sensitivity

// understanding examples: ["flower","flow","flight"]) === "fl" since all 3 strings have fl in the beginning of the string
//                        ["dog","racecar","car"])  === "" has no common prefix so empty string returned

// algorithm:
// extract out the first word from given string array into firstWord variable
// create a commonPrefix variable and initialize an empty string to start with
// outer itereation iterating from the first LETTER of the first world till end of length
// inner iteration iteraeting from the second STRING of the string array given 

// once inner loop finished itereating / if the current character is found in all strings, add to commonPrefix

// return commonPrefix

// function commonPrefix(strsArr) {
//   let commonPrefix = '';
//   let firstWord = strsArr[0];

//   for (let idx1 = 0; idx1 < firstWord.length; idx1 += 1) {
//     let currentCharacter = firstWord[idx1];
//     for (let idx2 = 1; idx2 < strsArr.length; idx2 += 1) {
//       if (strsArr[idx2][idx1] !== currentCharacter) return commonPrefix;
//     }
//     commonPrefix += currentCharacter;
//   }

//   return commonPrefix;
// }

// console.log(commonPrefix(["flower", "flow", "flight"]) === "fl"); // true
// console.log(commonPrefix(["dog", "racecar", "car"]) === ""); // true
// console.log(commonPrefix(["interspecies", "interstellar", "interstate"]) === "inters"); // true
// console.log(commonPrefix(["throne", "dungeon"]) === ""); // true
// console.log(commonPrefix(["throne", "throne"]) === "throne"); // true



//given array of integers, return index N where sum of integers to the left to N equals sum of integers to the right of N. if no such index exists, return -1

// console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1]) === 3)
// console.log(findEvenIndex([1, 100, 50, -51, 1, 1]) === 1)
// console.log(findEvenIndex([1, 2, 3, 4, 5, 6]) === -1)
// console.log(findEvenIndex([20, 10, 30, 10, 10, 15, 35]) === 3)
// console.log(findEvenIndex([20, 10, -80, 10, 10, 15, 35]) === 0)
// console.log(findEvenIndex([10, -80, 10, 10, 15, 35, 20]) === 6)
// console.log(findEvenIndex([-1, -2, -3, -4, -3, -2, -1]) === 3)

// //[1,2,3]
// //iterate thru - let arr[0/i]=candidate. check if slice(0,candidate)===slice.(candidate+1)

// function findEvenIndex(array) {
//   for (let i = 0; i < array.length; i++) {
//     let left = array.slice(0, i);
//     let right = array.slice(i + 1);
//     if (left.reduce((acc, curr) => acc + curr, 0) === right.reduce((acc, curr) => acc + curr, 0)) {
//       return i;
//     }
//   }
//   return -1;
// }

