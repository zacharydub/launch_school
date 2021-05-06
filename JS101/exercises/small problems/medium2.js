//#1
//Write a function that takes a string, and returns an object containing the following three properties: 1)the percentage of characters in the string that are lowercase letters 2)the percentage of characters that are uppercase letters 3)the percentage of characters that are neither
// letterPercentages('abCdef 123');
// // { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }
// letterPercentages('AbCd +Ef');
// // { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }
// letterPercentages('123')
// // { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }

// function letterPercentages(string) {
//   let obj = { 'lowercase': 0, 'uppercase': 0, 'neither': 0 }
//   for (let i = 0; i < string.length; i++) {
//     if (string[i] >= 'a' && string[i] <= 'z') {
//       obj.lowercase += 1
//     } else if (string[i] >= 'A' && string[i] <= 'Z') {
//       obj.uppercase += 1
//     } else {
//       obj.neither += 1
//     }
//   }

//   let lowerPer = ((obj.lowercase / string.length) * 100).toFixed(2)
//   let higherPer = ((obj.uppercase / string.length) * 100).toFixed(2)
//   let neitherPer = ((obj.neither / string.length) * 100).toFixed(2)

//   let objPer = {
//     lowercase: lowerPer, uppercase: higherPer, neither: neitherPer
//   }
//   console.log(objPer)
// }

// #2
//To be a valid triangle, the sum of the lengths of the two shortest sides must be greater than the length of the longest side, and every side must have a length greater than 0. If either of these conditions is not satisfied, the triangle is invalid.
// //Write a function that takes the lengths of the three sides of a triangle as arguments, and returns one of the following four strings representing the triangle's classification: 'equilateral', 'isosceles', 'scalene', or 'invalid'.

// triangle(3, 3, 3);        // "equilateral"
// triangle(3, 3, 1.5);      // "isosceles"
// triangle(3, 4, 5);        // "scalene"
// triangle(0, 3, 3);        // "invalid"
// triangle(3, 1, 1);        // "invalid"

// function triangle(side1, side2, side3) {
//   if ((side1 > (side2 + side3)) || (side2 > (side1 + side3)) || side3 > (side2 + side1) || side1 === 0 || side2 === 0 || side3 === 0
//   ) {
//     console.log('invalid')
//   }
//   else if ((side1 === side2 && side1 !== side3) || (side1 === side3 && side1 !== side2) || (side2 === side3 && side2 !== side1)) {
//     console.log('isosceles')
//   } else if (side1 === side2 && side1 === side3) {
//     console.log('equilateral')
//   } else { console.log('scalene') }
// }

// #3
//Write a function that takes the three angles of a triangle as arguments, and returns one of the following four strings representing the triangle's classification: 'right', 'acute', 'obtuse', or 'invalid'.

// function triangle(angle1, angle2, angle3) {
//   //invalid
//   if (angle1 + angle2 + angle3 !== 180 || angle1 <= 0 || angle2 <= 0 || angle3 <= 0) {
//     return 'invalid'
//   }
//   if (angle1 > 90 || angle2 > 90 || angle3 > 90) {
//     return "obtuse"
//   }
//   if (angle1 < 90 && angle2 < 90 && angle3 < 90) {
//     return "acute"
//   }
//   if (angle1 === 90 || angle2 === 90 || angle3 === 90) {
//     return "right"
//   }
// }

// console.log(triangle(60, 70, 50));       // "acute"
// console.log(triangle(30, 90, 60));       // "right"
// console.log(triangle(120, 50, 10));      // "obtuse"
// console.log(triangle(0, 90, 90));        // "invalid"
// console.log(triangle(50, 50, 50));       // "invalid"

// #4
//Write a function that takes a year as an argument, and returns the number of Friday the 13ths in that year. 
// fridayThe13ths(1986);      // 1
// fridayThe13ths(2015);      // 3
// fridayThe13ths(2017);      // 2

// function fridayThe13ths(year) {
//   let thirteenths = [];
//   for (let month = 0; month < 12; month += 1) {
//     thirteenths.push(new Date(year, month, 13));
//   }
//   return thirteenths.reduce((count, day) => {
//     return day.getDay() === 5 ? (count + 1) : count;
//   }, 0);
// }
// // Note that the Date.prototype.getDay method returns an integer between 0 (Sunday) and 6 (Saturday). Also note that when passing a month to the Date constructor, the value should be an integer between 0 (January) and 11 (December); the range of the day argument, however, starts at 1 (first day of the month) instead of 0 (last day of the previous month).

// #5
// featured(12);           // 21
// featured(20);           // 21
// featured(21);           // 35
// featured(997);          // 1029
// featured(1029);         // 1043
// featured(999999);       // 1023547
// featured(999999987);    // 1023456987
// featured(9876543200);   // 9876543201
// featured(9876543201);
// function featured(integer) {
//   while (true) {
//     if (integer >= 9876543201) {
//       console.log("error")
//       break
//     }
//     integer += 1
//     if (integer % 7 === 0 && integer % 2 === 1 && isUniqueDigits(integer)) {
//       console.log(integer)
//       break
//     }

//   }
// }
// function isUniqueDigits(integer) {
//   let arr = String(integer).split('')
//   for (let i = 0; i < arr.length; i++) {
//     if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
//       return false
//     }
//   }
//   return true
// }
// console.log(isUniqueDigits(12))
// console.log(isUniqueDigits(22))
// console.log(isUniqueDigits(122))
// console.log(isUniqueDigits(1023))
// console.log(isUniqueDigits(1022))

// #6
//Write a function that computes the difference between the square of the sum of the first count positive integers and the sum of the squares of the first count positive integers.
// sumSquareDifference(3);      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
// sumSquareDifference(10);     // 2640
// sumSquareDifference(1);      // 0
// sumSquareDifference(100);    // 25164150

// //iterate all numbers up to input and push to an array. then square the sum (reduce). then square each elm (foreach). then subtract
// function sumSquareDifference(count) {
//   let arrayNums = []
//   for (let i = 1; i <= count; i++) {
//     arrayNums.push(i)
//   }
//   let squaredSum = arrayNums.reduce((acc, curr) => acc + curr) ** 2

//   let squaredElms = 0
//   arrayNums.forEach(elm => {
//     squaredElms += elm ** 2
//   })

//   console.log(squaredSum - squaredElms)
// }

// #7
//bubble sort algo - A bubble sort works by making multiple passes (iterations) through an array. On each pass, the two values of each pair of consecutive elements are compared. If the first value is greater than the second, the two elements are swapped. This process is repeated until a complete pass is made without performing any swaps. At that point, the array is completely sorted.

// function bubbleSort(arr) {
//   while (true) {
//     let swapped = false
//     for (let i = 1; i < arr.length; i++) {
//       if (arr[i - 1] <= arr[i]) continue
//       [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
//       swapped = true
//     }
//     if (!swapped) break
//   }
//   return arr
// }

// console.log(bubbleSort([6, 2, 7, 1, 4]))
// console.log(bubbleSort([5, 3]))
// console.log(bubbleSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']))

// #8
