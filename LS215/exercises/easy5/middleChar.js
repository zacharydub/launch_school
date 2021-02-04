//Write a function that takes a non-empty string argument, and returns the middle character(s) of the string. If the string has an odd length, you should return exactly one character. If the string has an even length, you should return exactly two characters.

algo:
//check length of str
//if odd - return str[Math.floor(str.length/2)] - i.e. 7 chars - 7/2 = 3.5 -> get index 3 which is 4th
//if even - return str.substr((str.length/2)-1,2)

console.log(centerOf('I Love JavaScript')); // "a"
console.log(centerOf('Launch School'));     // " "
console.log(centerOf('Launch'));            // "un"
console.log(centerOf('Launchschool'));      // "hs"
console.log(centerOf('x'));                 // "x"

function centerOf(str) {
  //if(str.length % 2 === 1){
  //  return str[Math.floor(str.length/2)]
  //} else{
  //  return str.substr((str.length/2)-1,2)
  //}

  return str.length % 2 === 1 ? str[Math.floor(str.length / 2)] : str.substr((str.length / 2) - 1, 2)
}
