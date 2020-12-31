
// // #1
// order the following array of number strings by descending numeric value (largest number value to smallest)?
// let arr = ['10', '11', '9', '7', '8'];
// //solution
// let numArr = arr.map(elm => Number(elm))
// numArr.sort((a, b) => b - a)
// //OR 
// arr.sort((a, b) => Number(b) - Number(a));

// // // #2   *****to review*****
// // order the following array of objects based on the year of publication of each book, from the earliest to the latest?
// let books = [
//   { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
//   { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
//   { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
//   { title: 'Ulysses', author: 'James Joyce', published: '1922' },
//   { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },];
// //solution
// books.sort((a, b) => {
//   return Number(a.published) - Number(b.published);});

// // // #3
// // demonstrate how you would access the letter g.
// let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
// let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
// let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
// let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
// let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 } }
// //solution
// arr1[2][1][3]
// arr2[1].third[0]
// arr3[2].third[0][0]
// obj1.b[1]
// Object.keys(obj2.third)[0]

// // // #4
// // demonstrate how you would change the value 3 to 4.
// let arr1 = [1, [2, 3], 4];
// let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
// let obj1 = { first: [1, 2, [3]] };
// let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
// arr1[1][1] = 4
// arr2[2] = 4
// obj1['first'][2][0] = 4
// obj2['a']['a'][2] = 4

// // #5
// let munsters = {
//   Herman: { age: 32, gender: 'male' },
//   Lily: { age: 30, gender: 'female' },
//   Grandpa: { age: 402, gender: 'male' },
//   Eddie: { age: 10, gender: 'male' },
//   Marilyn: { age: 23, gender: 'female' }};
// // Compute and display the total age of the male members of the family
// let munArray = Object.entries(munsters)
// //[herman,{age:32, gender:male}], []
// let totalAge = 0
// munArray.forEach(elm => {
//   if (elm[1].gender === 'male') {
//     totalAge += elm[1].age}
//   return totalAge})
// console.log(totalAge)
// //OR using object iteration
// let totalMaleAge = 0;
// for (let member in munsters) {
//   if (munsters[member]['gender'] === 'male') {
//     totalMaleAge += munsters[member].age;}}

// // #6 - Each output line should follow this pattern:
// (Name) is a (age)-year-old (male or female).
//name is object key...age is object value....gender is object value
// let arr = Object.entries(munsters)
// //[herman,{age:32, gender:male}], []
// arr.forEach(elm =>
//   console.log(`${elm[0]} is a ${elm[1].age}-year-old ${elm[1].gender}`))

// // #7 - what will the final values of a and b be? Try to answer without running the code.
// let a = 2;
// let b = [5, 8];
// let arr = [a, b]; // [2,[5,8]]
// arr[0] += 2;
// arr[1][0] -= a;
//a =>2 | b=>[3,8]


// // #8 ****to review****
// Using the forEach method, write some code to output all vowels from the strings in the arrays. Don't use a for or while loop.

// let obj = {
//   first: ['the', 'quick'],
//   second: ['brown', 'fox'],
//   third: ['jumped'],
//   fourth: ['over', 'the', 'lazy', 'dog'],};
// let vowels = 'aeiou'
// Object.values(obj).forEach(elm => {
//   elm.forEach(elem => {
//     elem.split("").forEach(char => {
//       if (vowels.includes(char)) {
//         console.log(char) } }) })})

// // #9 - return a new array with the same structure, but with the subarrays ordered -- alphabetically or numerically as appropriate -- in ascending order.
// let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];
// //solution
// arr.map(subArr => {
//   if (typeof subArr[0] === 'string') {
//     // we have an array of strings
//     return subArr.slice().sort();
//   } else {
//     // we have an array of numbers
//     return subArr.slice().sort((a, b) => a - b);});

// // #10 -- same as #9 but reverse order
// arr.map(subArr => {
//   if (typeof subArr[0] === 'string') {
//     // we have an array of strings
//     return subArr.slice().sort().reverse();
//   } else {
//     // we have an array of numbers
//     return subArr.slice().sort((a, b) => b - a);}});

// // #11 - use the map method to return a new array identical in structure to the original but, with each the number incremented by 1. Do not modify the original data structure.
// let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
// //solution
// arr.map(obj => {
//   let newObj = {}
//   for (let key in obj) {
//     newObj[key] = obj[key] + 1}
//   return newObj})

// // #12 - return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.
// let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
// arr.map(subarr => {
//   return subarr.filter(elm => elm % 3 === 0)})

// // #13 - ******to review*****
//sort the array so that the sub-arrays are ordered based on the sum of the odd numbers that they contain.
// let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
// //sum the odd nums of each sub-array, then order based on sum
//solution
// arr.sort((a, b) => {
//   let oddSumA = a.filter(num => num % 2 === 1)
//                  .reduce((sum, next) => sum + next);
//   let oddSumB = b.filter(num => num % 2 === 1)
//                  .reduce((sum, next) => sum + next);
// return oddSumA - oddSumB;});

// // #14
// write some code to return an array containing the colors of the fruits and the sizes of the vegetables. The sizes should be uppercase, and the colors should be capitalized.
// let obj = {
//   grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
//   carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
//   apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
//   apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
//   marrow: { type: 'vegetable', colors: ['green'], size: 'large' },};
// //solution
// let capitalize = word => word[0].toUpperCase() + word.slice(1);
// Object.values(obj).map(attributes => {
//   if (attributes['type'] === 'fruit') {
//     return attributes['colors'].map(char => capitalize(char));
//   } else {
//     return attributes['size'].toUpperCase();}});


// // #15         ***** to review*****
// write some code to return an array which contains only the objects where all the numbers are even.
// let arr = [
//   { a: [1, 2, 3] },
//   { b: [2, 4, 6], c: [3, 6], d: [4] },
//   { e: [8], f: [6, 10] },];
// //solution
//   arr.filter(obj => {
//     return Object.values(obj).every(subArr => {
//       return subArr.every(num => num % 2 === 0);});});

// // #16
// write some code that returns an object where the key is the first item in each subarray, and the value is the second
// let arr = [['a', 1], ['b', 'two'], ['sea', { 'c': 3 }], ['D', ['a', 'b', 'c']]];
// //solution
// let newObj = {}
// arr.forEach(subArray => {
//   // let key = subArray[0]
//   // let value = subArray[1]
//   newObj[subArray[0]] = subArray[1]
//   // newObj[key] = value
// })
// newObj


// // #17   ***** to review******
// function UUID() {
//   function generateUUID() {
//     let characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
//     let sections = [8, 4, 4, 4, 12];
//     let uuid = '';
//     sections.forEach((section, sectionIndex) => {
//       for (let index = 1; index <= section; index++) {
//         let randomIndex = Math.floor(Math.random() * characters.length);
//         uuid += characters[randomIndex];}
//       if (sectionIndex < sections.length - 1) {
//         uuid += '-';}});
//     return uuid;}}


