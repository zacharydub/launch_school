// // #1
// let advice = "Few things in life are as important as house training your pet dinosaur.";
// console.log(advice.replaceAll("important", "urgent"))

// // #2
//Array.reverse and Array.sort mutate the original array.
// How to accomplish reversing the order without mutating?
let numbers = [1, 2, 3, 4, 5]
//numbers.slice().reverse()
//   OR
//****to review********
console.log([...numbers].sort((num1, num2) => num2 - num1));
//   OR
//                   ****TO REVIEW********
let reversedArray = [];
// numbers.forEach((number) => {
//   reversedArray.unshift(number);});
// console.log(reversedArray);
// console.log(numbers)
// numbers.forEach((number) => {
//   console.log(reversedArray.shift(number));});
// console.log(numbers)
//  OR
//                   ****TO REVIEW********
//let reversedArray = numbers.reduce((acc, num) => ([num, ...acc]), []);

// // #3
// let numbers1 = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];
// console.log(numbers1.includes(8))
// console.log(numbers1.indexOf(8))
// console.log(numbers1.indexOf(8) === -1)

// // #4
// let famousWords = "seven years ago..."
// console.log("four score and " + famousWords)
// let newstr = "four score and "
// console.log(newstr.concat('', famousWords))

// // // #5
// mutate the array by removing the number at index 2, so that the array becomes [1, 2, 4, 5].
// let array1 = [1, 2, 3, 4, 5]
// let array2 = array1.slice(2, 4)
// console.log(array1)
// console.log(array2)
// array1.splice(2, 1)
// console.log(array1)

// // #6                ********** to review*********
// extract reg array from nested array
// forEach + concat
// //                    
// Array.concat + ... spread-Syntax 
// reduce 

// // #7
//              filter     **** to review***** -
// let flintstones = { Fred: 0, Wilma: 1, Barney: '', Betty: 3, Bambam: 4, Pebbles: 5 };
// let arr1 = [[1, 2], [3, 4], [5, 6]]
// // // Create an array from this object that contains only two elements: Barney's name and Barney's number:
// let y = Object.entries(flintstones).filter(pair => pair[0] === "Barney")
// console.log(y)

// // // #10
// count the number of lower-case t characters in each of the following strings:
// let statement1 = "The Flintstones Rock!";
// let statement2 = "Easy come, easy go."
// //mdn
// let count = 0
// let position = statement1.indexOf('t')
// while (position !== -1) {
//   count++
//   position = statement1.indexOf('t', position + 1}
// console.log(count)
// //   OR 
// statement1.split('').filter(char => char === 't').length;


// ES6
let x1 = 'Spread Operator / Rest Operator'
// add the elements of an existing array into a new array
// var certsToAdd = ['Algorithms and Data Structures', 'Front End Libraries'];
// var certifications = ['Responsive Web Design', ...certsToAdd, 'Data Visualization', 'APIs and Microservices', 'Quality Assurance and Information Security'];
// console.log(certifications);
// // pass elements of an array as arguments to a function
// function addThreeNumbers(x, y, z) {
//   console.log(x + y + z)
// }
// var args = [0, 1, 2, 3];
// addThreeNumbers(...args);
// // copy arrays
// var arr = [1, 2, 3];
// var arr2 = [...arr]; // like arr.slice()
// arr2.push(4);
// console.log(arr);
// console.log(arr2);
// // concatenate arrays
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// //arr1.concat(arr2);
// arr1 = [...arr1, "freeCodeCamp", ...arr2];
// console.log(arr1);
// // REST: condense multiple elements into an array
function multiply(multiplier, ...theArgs) {
  return theArgs.map(function (element) {
    return multiplier * element;
  });
}
var arr = multiply(2, 1, 2, 3);
console.log(arr)


