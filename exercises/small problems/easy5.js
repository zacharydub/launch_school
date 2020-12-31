const readlineSync = require('readline-sync');

// #1
// Write a function that takes a floating point number representing an angle between 0 and 360 degrees, and returns a string representing that angle in degrees, minutes, and seconds. You should use a degree symbol (˚) to represent degrees, a single quote (') to represent minutes, and a double quote (") to represent seconds. There are 60 minutes in a degree, and 60 seconds in a minute.

// const DEGREE = '\xB0';
// const MINUTES_PER_DEGREE = 60;
// const SECONDS_PER_MINUTE = 60;
// const SECONDS_PER_DEGREE = MINUTES_PER_DEGREE * SECONDS_PER_MINUTE;

// function dms(degreesFloat) {
//   let degreesInt = Math.floor(degreesFloat);
//   let minutes = Math.floor((degreesFloat - degreesInt) * MINUTES_PER_DEGREE);
//   let seconds = Math.floor(
//     (degreesFloat - degreesInt - (minutes / MINUTES_PER_DEGREE)) *
//     SECONDS_PER_DEGREE
//   );

//   return String(degreesInt) + DEGREE + padZeroes(minutes) + "'" +
//     padZeroes(seconds) + '"';
// }

// function padZeroes(number) {
//   let numString = String(number);
//   return numString.length < 2 ? ('0' + numString) : numString;
// }

// #2
// Write a function that takes two arrays as arguments, and returns an array containing the union of the values from the two. There should be no duplication of values in the returned array, even if there are duplicates in the original arrays. You may assume that both arguments will always be arrays.

//input: 2 arrays || output: 1 array with no dplicates
//how to combine - concat
//how to remove dplicates? locate any dupes sing indexof===lastindexof. Then splice out that index splice(index,1)

// function union(array1, array2) {
//   let combined = array1.concat(array2)
//   let copy = combined.slice()
//   for (let i = 0; i < combined.length; i++) {
//     if (combined.indexOf(combined[i]) !== combined.lastIndexOf(combined[i])) {
//       copy.splice(combined.indexOf(combined[i]), 1)
//     }
//   }
//   return copy
// }
// console.log(union([1, 3, 3, 5, 9], [3, 6, 6, 9, 9]))

// function union(array1, array2) {
//   let resultArray = []
//   addtoArray(resultArray, array1)
//   addtoArray(resultArray, array2)
//   return resultArray
// }
// function addtoArray(newArray, array) {
//   array.forEach(each => {
//     // if (!newArray.includes(each)) {
//     if (newArray.indexOf(each) === -1) {
//       newArray.push(each)
//     }
//   })
// }
// # 3
// Write a function that takes an array as an argument, and returns an array that contains two elements, each of which is an array. Put the first half of the original array elements in the first element of the return value, and put the second half in the second element. If the original array contains an odd number of elements, place the middle element in the first half array.
// halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
// halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
// halvsies([5]);                // [[5], []]
// halvsies([]);                 // [[], []]

// function halvsies(array) {
//   let half1 = array.slice(0, Math.ceil(array.length / 2))
//   let half2 = array.slice(Math.ceil(array.length / 2))
//   // let newArray = []
//   // newArray.push(half1, half2)
//   // return console.log(newArray)
//   return console.log([half1, half2])
// }

// #4
// Given an unordered array and the information that exactly one value in the array occurs twice (every other value occurs exactly once), determine which value occurs twice. Write a function that will find and return the duplicate value that is in the array.
// console.log(findDup([1, 5, 3, 1]))

// function findDup(array) {
//   for (let i = 0; i < array.length; i++) {
//     if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
//       return array[i]
//     }
//   }
// }

// #5
// Write a function that combines two arrays passed as arguments, and returns a new array that contains all elements from both array arguments, with each element taken in alternation.
// You may assume that both input arrays are non-empty, and that they have the same number of elements.
// console.log(interleave([1, 2, 3], ['a', 'b', 'c']));    // [1, "a", 2, "b", 3, "c"]

// function interleave(array1, array2) {
//   let newArr = []
//   // for (let i = 0; i < array1.length; i++) {
//   //   newArr.push(array1[i], array2[i])
//   // }
// // OR using forEach
//   array1.forEach((each, index) => {
//     newArr.push(each, array2[index])
//   })
//   return newArr
// }

// #6
//Write a function that takes an array of integers as input, multiplies all of the integers together, divides the result by the number of entries in the array, and returns the result as a string with the value rounded to three decimal places.
// multiplicativeAverage([3, 5]);                   // "7.500"
// multiplicativeAverage([2, 5, 7, 11, 13, 17]);    // "28361.667"
// function multiplicativeAverage(array) {
//   let product = 1
//   array.forEach(each => product *= each)
//   let result = product / array.length
//   let final = result.toFixed(3)
//   return console.log(final)
// }

// #7
// Write a function that takes two array arguments, each containing a list of numbers, and returns a new array that contains the product of each pair of numbers from the arguments that have the same index. You may assume that the arguments contain the same number of elements.
// multiplyList([3, 5, 7], [9, 10, 11]);    // [27, 50, 77]

// function multiplyList(arr1, arr2) {
//   let newArr = arr1.map((each, index) => each * arr2[index])
//   return console.log(newArr)
// }

// #8
//Write a function that takes one argument, a positive integer, and returns a list of the digits in the number.
// digitList(12345);       // [1, 2, 3, 4, 5]
// digitList(7);           // [7]
// digitList(375290);      // [3, 7, 5, 2, 9, 0]
// digitList(444);         // [4, 4, 4]

// function digitList(integer) {
//   let stringed = String(integer)
//   let arr = stringed.split("")
//   let newarr = arr.map(each => Number(each))
//   return console.log(newarr)
// }

// #9
//Write a function that counts the number of occurrences of each element in a given array. Once counted, log each element alongside the number of occurrences. Consider the words case sensitive e.g. ("suv" !== "SUV").
// let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
//   'motorcycle', 'motorcycle', 'car', 'truck'];
// countOccurrences(vehicles);
// // console output -- your output sequence may be different
// // car => 4 ||truck => 3 || SUV => 1 || motorcycle => 2

// function countOccurrences(array) {
//   let obj = {}
//   array.forEach(each => {
//     obj[each] = obj[each] || 0
//     obj[each] += 1
//   })
//   //   if (obj[each]) {
//   //     obj[each] = obj[each] + 1
//   //   } else { obj[each] = 1 }
//   // })
//   // let arr = Object.entries(obj)
//   // for (let i = 0; i < arr.length; i++) {
//   //   console.log(`${arr[i][0]} => ${arr[i][1]}`)
//   // }
//   for (const key in obj) {
//     console.log(`${key} => ${obj[key]}`)
//   }
// }

// #10
//Write a function that takes one argument, an array of integers, and returns the average of all the integers in the array, rounded down to the integer component of the average. The array will never be empty, and the numbers will always be positive integers.
// console.log(average([1, 5, 87, 45, 8, 8]));       // 25
// console.log(average([9, 47, 23, 95, 16, 52]));    // 40

// function average(array) {
//   return Math.floor(array.reduce((acc, curr) => acc + curr) / array.length)
// }

// #11
// If the number of minutes is negative, the time is before midnight.
// Write a function that takes a time using this minute-based format and returns the time of day in 24 hour format (hh:mm). Your method should work with any integer input.

// const MINUTES_PER_HOUR = 60;
// const HOURS_PER_DAY = 24;
// const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

// function leadingZero(number) {
//   return number < 10 ? `0${number}` : String(number);
// }

// function formatTime(hours, minutes) {
//   return `${leadingZero(hours)}:${leadingZero(minutes)}`;
// }

// function timeOfDay(deltaMinutes) {
//   if (deltaMinutes < 0) {
//     deltaMinutes = (deltaMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY;
//   } else {
//     deltaMinutes = deltaMinutes % MINUTES_PER_DAY;
//   }

//   let hours = Math.floor(deltaMinutes / MINUTES_PER_HOUR);
//   let minutes = deltaMinutes % MINUTES_PER_HOUR;

//   return formatTime(hours, minutes);
// }

// #12
// //Write two functions that each take a time of day in 24 hour format, and return the number of minutes before and after midnight, respectively. Both functions should return a value in the range 0..1439.
// const HOURS_PER_DAY = 24;
// const MINUTES_PER_HOUR = 60;
// const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

// function afterMidnight(timeStr) {
//   let [hours, minutes] = timeStr.split(":").map(num => Number(num));
//   return ((hours * MINUTES_PER_HOUR) + minutes) % MINUTES_PER_DAY;
// }

// function beforeMidnight(timeStr) {
//   let deltaMinutes = MINUTES_PER_DAY - afterMidnight(timeStr);
//   if (deltaMinutes === MINUTES_PER_DAY) {
//     deltaMinutes = 0;
//   }
//   return deltaMinutes;
// }