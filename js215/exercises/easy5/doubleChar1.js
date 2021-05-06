//Write a function that takes a string, doubles every character in the string, and returns the result as a new string.
console.log(repeater('Hello'));        // "HHeelllloo"
console.log(repeater('Good job!'));    // "GGoooodd  jjoobb!!"
console.log(repeater(''));             // ""

//algo
//initialize returnString
//iterate thru input String
//for every char, pass char + char to return str
//return returnString

function repeater(str) {
  let returnStr = '';

  for (let i = 0; i < str.length; i++) {
    returnStr += str[i] + str[i];
  }
  return returnStr;
}
