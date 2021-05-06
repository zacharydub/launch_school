//You have a bank of switches before you, numbered from 1 to n. Every switch is connected to exactly one light that is initially off. You walk down the row of switches and toggle every one of them. You walk back to the beginning of the row and start another pass. On this second pass, you toggle switches 2, 4, 6, and so on. On the third pass, you go back to the beginning again, this time toggling switches 3, 6, 9, and so on. You continue to repeat this process until you have gone through n repetitions.
//
//Write a program that takes one argument—the total number of switches—and returns an array of the lights that are on after n repetitions.

console.log(lightsOn(5))        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

console.log(lightsOn(100));      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
console.log(lightsOn(24));
console.log(lightsOn(25));
console.log(lightsOn(0))
console.log(lightsOn([]))
console.log(lightsOn('a'))
console.log(lightsOn(1))

//given integer input, return an array showing which numbers/lights are toggled to 'on'
//input: integer || output: array of integers (representing lights turned on)
//rules:
//start with n number of lights turned off
//iterate n times
//for each iteration, toggle all the lights, starting with light # n and all multiples of n

//algo
//create array with elements representing lights with an on/off setting - true/false - all elements set to false
//iterate 'n' times
//on each iteration, toggle the elements which are multiple of iteration count
//map array where all true values are converted to index number
//return filtered array

//how to watch out for array element 0

function lightsOn(n) {
  let arr = Array(n).fill(false);
  arr.unshift(1);

  for (let i = 1; i <= n; i++) {
    arr = arr.map((elm, index) => {
      if (index % i === 0) {
        return !elm;
      } else {
        return elm;
      }
    })
  }
  let mapped = arr.map((elm, index) => {
    if (elm) {
      return index;
    } else {
      return elm;
    }
  })
  return mapped.filter(elm => elm);
}









function lightsOn(n) {
  let returnArr = [];
  for (let i = 1; i <= n; i++) {
    if (Math.sqrt(i) % 1 === 0) {
      returnArr.push(i);
    }
  }
  return returnArr;
}
