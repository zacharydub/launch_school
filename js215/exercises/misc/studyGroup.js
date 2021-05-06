//input validation
//check that it's a string and consists of only numbers

//play around with provided examples - break them down and see how it processes

//write func tht will return true if a given string (divided and grouped into a size) will contain a set of conscutive numbers regardless of orientation, whether ascending or descneing - otherwie return false

console.log(isConsecutive('121314151617')) //=> true
console.log(isConsecutive('12345678')) // true
console.log(isConsecutive('12456')) // false
console.log(isConsecutive('111112113114')) // true
console.log(isConsecutive('100101'))
//input:str || output: boolean

//algo
//convert to Array
// start with 2 slices (keep going til length/2 slices )
//slice(0,length/2) - slice(length/2)
//push these 2 to a new array and send to helper func
//check if each slice has same # of elms. if yes, keep going, if not move on to divide into 3 slices
//check if elms are consecutive - up or down
//if yes return true

function isConsecutive(str) {
  let arr = str.split('');
  let maxGroupSize = arr.length / 2

}
function checkArr(arr) { }
