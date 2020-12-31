//find all palindromes in a given string
// 1 - find all substrings:
function substrings(str) {
  let result = [];
  let startingIndex = 0;
  while (startingIndex <= str.length - 2) {
    let numChars = 2;
    while (numChars <= str.length - startingIndex) {
      let substring = str.slice(startingIndex, startingIndex + numChars);
      result.push(substring);
      numChars += 1;
    }
    startingIndex += 1;
  }
  return result;
}
// 2 - check if a palindrome:
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

function palindromeSubstrings(str) {
  let result = [];
  let substringsArr = substrings(str);
  substringsArr.forEach(substring => {
    if (isPalidrome(substring)) {
      result.push(substring);
    }
  }); return result;
}
console.log(palindromeSubstrings("supercalifragilisticexpialidocious")); // ["ili"]
console.log(palindromeSubstrings("abcddcbA"));   // ["bcddcb", "cddc", "dd"]
console.log(palindromeSubstrings("palindrome")); // []
console.log(palindromeSubstrings(""));           // []
// Here's the complete informal pseudocode for this problem:

// input: a string
// output: an array of substrings
// rules: palindrome words should be case sensitive, meaning "abBA"
//        is not a palindrome

// Algorithm:
//  substrings function
//  =================
//    - create an empty array called `result` that will contain all required substrings
//    - create a `startingIndex` variable (value `0`) for the starting index of a substring
//    - start a loop that iterates over `startingIndex` from `0` to the length of the string minus 2
//      - create a `numChars` variable (value `2`) for the length of a substring
//      - start an inner loop that iterates over `numChars` from `2` to `string.length - startingIndex`
//        - extract a substring of length `numChars` from `string` starting at `startingIndex`
//        - append the extracted substring to the `result` array
//        - increment the `numChars` variable by `1`
//      - end the inner loop
//      - increment the `startingIndex` variable by `1`
//    - end the outer loop
//    - return the `result` array

//  isPalindrome function
//  =====================
//    - Inside the `isPalindrome` function, check whether the string
//      value is equal to its reversed value.

//  palindromeSubstrings function
//  ============================
//    - declare a `result` variable and initialize it to an empty array
//    - create an array named `substrArray` that will contain all of the
//      substrings of the input string that are at least 2 characters long.
//    - loop through the words in the `substrArray` array.
//      - if the word is a palindrome, append it to the `result` array
//    - return the `result` array


// you should be able to write a plain English solution to the problem. If you can't do that, you won't be able to code it either. 

// Test your code early and often while writing it.
// Each time you write a bit of code that you can test, test it and make sure you're getting the answer you expect. Don't wait until you're finished writing the entire program or function or even an entire loop if you can test something earlier. This way, if there is a bug in your code, you'll find it as soon as possible; the sooner you find a bug, the easier it will be to identify what's wrong and fix it.
