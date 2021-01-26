//Write a function that takes a string argument, and returns a list of all substrings that start from the beginning of the string, ordered from shortest to longest.

console.log(leadingSubstrings('abc'));      // ["a", "ab", "abc"]
console.log(leadingSubstrings('a'));        // ["a"]
console.log(leadingSubstrings('xyzzy'));    // ["x", "xy", "xyz", "xyzz", "xyzzy"]

function leadingSubstrings(str) {
  return str.split('')
    .map((elm, index, arr) => str.slice(0, index + 1))

  //.map((elm, index, arr) => arr.slice(0, index + 1))
  //.map(elm => elm.join(''))
}

//ALTERNATE:
//function leadingSubstrings(string) {
//  return string.split('')
//    .map((value, index) => string.slice(0, index + 1));
//}

//ALTERNATE:
//function leadingSubstrings(string) {
//  let substrings = [];
//  for (let length = 1; length <= string.length; length += 1) {
//    substrings.push(string.slice(0, length));
//  }
//
//  return substrings;
//}
