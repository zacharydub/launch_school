// // #1      **** to review****
// For this practice problem, write a program that creates the following output 10 times, with each line indented 1 space to the right of the line above it:
// The Flintstones Rock!
//  The Flintstones Rock!
// for (let padding = 1; padding <= 10; padding+){
//   console.log(" ".repeat(padding) + "The Flinstones Rock!");}

// // #2
// Starting with the string:
// let munstersDescription = "The Munsters are creepy and spooky.";
// // Return a new string that swaps the case of all of the letters:
// console.log(munstersDescription[0].toLowerCase() + munstersDescription.slice(1, 4).toUpperCase() + munstersDescription[4].toLowerCase() + munstersDescription.slice(5).toUpperCase())
// // OR better:
// munstersDescription.split("").map(function (char){
//   if (char === char.toUpperCase()) {
//     return char.toLowerCase(); } else {
//     return char.toUpperCase(); }
// }).join("");

// // #3       *****TO REVIEW*****
//  intended to return all of the factors of number:
// function factors(number) {
//   let divisor = number;
//   let factors = [];
//   do {
//     if (number % divisor === 0) {
//       factors.push(number / divisor);}
//     divisor -= 1;
//   } while (divisor !== 0);
//   return factors;}
// ^Code failS when the input is 0 or a negative number. How to make this work without using a do/while loop? Note that we're not looking to find the factors for 0 or negative numbers, but we want to handle it gracefully instead of raising an exception or going into an infinite loop:
// function factors(number) {
//   let divisor = number;
//   let factors = [];
//   while (divisor > 0) {
//     if (number % divisor === 0) {
//       factors.push(number / divisor);
//     }divisor -= 1}}

// // #5   *** to review****
// What will the following two lines of code output?:
// console.log(0.3 + 0.6);
// console.log(0.3 + 0.6 === 0.9);
// If you thought that the outputs would be 0.9 and true, respectively, you were wrong. JavaScript uses floating point numbers for all numeric operations. Most floating point representations used on computers lack a certain amount of precision, and that can yield unexpected results like these. Output was:
// 0.8999999999999999
// false
// *************************using node, I dont see all result in floating pt numbs. i.e .4+.4

// // // #6
// What do you think the following code will output?
// let nanArray = [NaN];
// console.log(nanArray[0] === NaN);
// // The output is false. NaN -- not a number -- is a special numeric value that indicates that an operation that was intended to return a number failed. JavaScript doesn't let you use == and === to determine whether a value is NaN.

// // To test whether the value is NaN, we use the isNaN() function:
// console.log(isNaN(nanArray[0])); // true
// console.log(isNaN(NaN))

// // #7
// What is the output of the following code?
// let answer = 42;
// function messWithIt(someNumber) {
//   return (someNumber += 8);
// }
// let newAnswer = messWithIt(answer);
// console.log(answer - 8);
// console.log(newAnswer)

// // #9 ***** to review*****
// // #10 ***** to review*****

// transform the numbers based on their position in the array rather than their value? Try coding a solution that doubles the numbers that have odd indices:
// function doubleOdd(arr) {
//   for (i = 1; i < arr.length; i += 2) {
//     arr[i] = arr[i] * 2}
//   return arr}
// console.log(doubleOdd([0, 1, 2, 3, 4, 5, 6, 7]))