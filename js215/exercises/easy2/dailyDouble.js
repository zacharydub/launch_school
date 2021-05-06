//Write a function that takes a string argument, and returns a new string that contains the value of the original string with all consecutive duplicate characters collapsed into a single character.

console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""

//iterate thru string
//if next char is same as current char, continue
//if not, pass

//function crunch(str) {
//  let returnStr = '';
//  for (let i = 0; i < str.length; i++) {
//    if (str[i] === str[i + 1]) {
//      continue;
//    }
//    returnStr += str[i];
//  }
//  return returnStr;
//}

function crunch(string) {
  return string.replace(/(.)\1/g, '$1');
  //(.) captures a single character. \1 references ("back-references") the captured character, comparing it to the current one.
}
