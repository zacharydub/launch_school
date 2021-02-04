//Write a function that takes a string, doubles every consonant character in the string, and returns the result as a new string. The function should not double vowels ('a','e','i','o','u'), digits, punctuation, or whitespace.

//iterate thru string
//if char is consonant, pass double
//regex that char is letter && vowels array doesn't include
//if not, pass as-is

console.log(doubleConsonants('String'));          // "SSttrrinngg"
console.log(doubleConsonants('Hello-World!'));    // "HHellllo-WWorrlldd!"
console.log(doubleConsonants('July 4th'));        // "JJullyy 4tthh"
console.log(doubleConsonants(''));                // ""

function doubleConsonants(str) {
  const vowels = 'aeiouAEIOU'.split('');;
  let returnStr = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i) && !vowels.includes(str[i])) {
      returnStr += str[i] + str[i]
    } else {
      returnStr += str[i]
    }

  }

  return returnStr;
}
