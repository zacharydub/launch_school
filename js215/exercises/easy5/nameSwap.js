//Write a function that takes a string argument consisting of a first name, a space, and a last name, and returns a new string consisting of the last name, a comma, a space, and the first name.

//function swapName(str) {
//  return str.split(" ").reverse().join(", ")
//}
//
////output: new str with last name, fist
//
//console.log(swapName('Joe Roberts'));    // "Roberts, Joe"

//What if the person had more than one first name?

function swapName2(str) {
  let arr = str.split(" ")
  let last = arr[arr.length - 1];
  let firsts = arr.slice(0, arr.length - 1)

  return `${last}, ${firsts.join(" ")}`
}

console.log(swapName2('Joe S. R. Roberts'))
