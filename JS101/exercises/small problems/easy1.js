//$ npm install readline-sync --save
const readlineSync = require('readline-sync');


//isnt it odd
// function isOdd(num) {
//   return Math.abs(number) % 2 !== 0)
// }
// console.log(isOdd(2))
// console.log(isOdd(5))
// console.log(isOdd(-17))
// console.log(isOdd(-8))
// console.log(isOdd(0))
// console.log(isOdd(7))

//odd #s
// for (let i = 1; i <= 99; i += 2) {
//   console.log(i)}  

//even #s
// for (let i = 2; i <= 99; i += 2) {
//   console.log(i)} 
//using 'continue'
// for (let number = 1; number < 100; number += 1) {
//   if (number % 2 === 1) {
//     continue;

//how big is the room
// console.log("Feet or meters")
// let choice = readlineSync.question();
// if (choice === 'feet') {
//   console.log("Length")
//   let length = readlineSync.question();
//   console.log("Width")
//   let width = readlineSync.question();
//   let areaFeet = width * length
//   console.log("Area is", areaFeet)
// } else if (choice === 'meters') {
//   console.log("Length")
//   length = readlineSync.question();
//   console.log("Width")
//   width = readlineSync.question()
//   let areaMeters = areaFeet * .3048
//   console.log("Area is", areaMeters)
// } else {
//   prompt("Write feet or meters")}
// function func() {
//   console.log("Length")
//   let length = readlineSync.question();
//   //let length = readlineSync.prompt() ***//readlineSync.prompt() method returns a string
// }
// // console.log(`Area is ${areaFeet} square feet and ${areaMeters} square meters`)

//tip calculator
// console.log("What is the bill amount");
// let amount = readlineSync.prompt();
// console.log("What tip %");
// let rate = readlineSync.prompt();
// let tip = amount * (rate / 100);
// let finalAmount = Number(amount) + Number(tip);

// console.log("The tip is $" + tip)
// console.log("The total is $" + finalAmount)

//sum or product the inputs
// console.log("Enter integer greater than 0")
// let int = readlineSync.question()
// console.log("see sum or product of all numbers between 1 and your selection (s/p)")
// let answer = readlineSync.question();
// while (!['s', 'p'].includes(answer)) {
//   console.log("Must enter 's' or 'p'")
//   answer = readlineSync.question();}
// if (answer === 's') {
//   let sum = 0;
//   for (i = 1; i <= int; i++) {
//     sum += i}
//   console.log(sum)
// } else {
//   let product = 1;
//   for (i = 1; i <= int; i++) {
//     product *= i }
//   console.log(product)} 

//^^ what if input was array of nums instead of a single integer. Would need to iterate over the array using the for loop. for (i=0;i<arr.length;i++){sum += arr[i]}

//shortLongShort('abc', 'defgh');    // "abcdefghabc"
// function func(first, second) {
//   if (first.length > second.length) {
//     return second + first + second
//   } else if (first.length < second.length) {
//     return first + second + first}}
// console.log(func('blah', 'cat'))

//Write a function that takes any year greater than 0 as input, and returns true if the year is a leap year, or false if it is not a leap year.
//leap years occur in every year that is evenly divisible by 4, unless the year is also divisible by 100. If the year is evenly divisible by 100, then it is not a leap year, unless the year is also evenly divisible by 400.
// function isLeapYear(year) {
//   if (year % 400 === 0) {
//     return true;
//   } else if (year % 100 === 0) {
//     return false;
//   } else {
//     return year % 4 === 0;} }
// //shorter
// function isLeapYear(year) {
//   return (year % 400 === 0)|| (year % 4 === 0 && year % 100 !== 0);}

//before(julian calendar - evey 4 years) vs after 1752 (current gregorian calendar) 
// function isLeapYear(year) {
//   if (year > 1752) {
//     return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
//   } else {
//     return (year % 4 === 0)}}

//multiples of 3 & 5 - Write a function that computes the sum of all numbers between 1 and some other number, inclusive, that are multiples of 3 or 5.

// function multisum(num) {
//   let sum = 0;
//   for (let i = 1; i <= num; i++) {
//     if (i % 3 === 0 || i % 5 === 0) {
//       sum += i }}
//   return sum}

//function that determines and returns the ASCII string value of a string
// function fun(str) {
//   let sum = 0;
//   for (i = 0; i < str.length; i++) {
//     sum += str.charCodeAt(i)}
//   return sum}
// console.log(fun('Launch School'));
// console.log(fun('Four score'));
