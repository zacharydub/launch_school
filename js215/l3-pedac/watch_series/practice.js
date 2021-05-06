//Write a function that takes an array of numbers, and returns the sum of the sums of each leading subsequence for that array. You may assume that the array always contains at least one number.

function sumOfSums(arr) {
  let sum = 0;
  let mapped = arr.map((elm, idx) => arr.slice(0, idx + 1)
    .reduce((sum, value) => sum + value))
  //mapped.forEach(sub => {
  //  sub.forEach(elm => sum += elm)
  //})
  console.log(mapped)
}

//iterate thru array
//for each elm,
sumOfSums([3, 5, 2]);
