const readlineSync = require('readline-sync');

//function that takes 2 arguments, an array and an object. The array will contain 2 or more elements that, when combined with adjoining spaces, will produce a person's name. The object will contain two keys, "title" and "occupation", and the appropriate values. Your function should return a greeting that uses the person's full name, and mentions the person's title.


// function greetings(array, object) {
//   return `Hello ${array.join(" ")}. Nice to have a ${object.title} ${object.occupation} aboard`
// }
// console.log(
//   greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
// );




// function func(arr, obj) {
//   let stringedArr = arr.join(" ")
//   return `Hello, ${stringedArr}! Nice to have a ${obj.title} ${obj.occupation} on board.`}
// console.log(func(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" }))

// Write a program that will ask for user's name. The program will then greet the user. If the user writes "name!" then the computer yells back to the user in all CAPS

// console.log("Whats your name?")
// let name = readlineSync.prompt()
// if (name[name.length - 1] === '!') {
//   name = name.slice(0, -1)
//   console.log(`HELLO ${name.toUpperCase()}. WHY ARE WE SCREAMING YOU CRAZY BABY!!`)
// } else {
//   console.log(`Hello ${name}`)
// }

// Create a function that takes two arguments, multiplies them together, and returns the result.

// function multiply(a, b) {
//   return a * b
// }
//OR
// let multiply = (a, b) => a * b
// console.log(multiply(5, 3))

// Using the multiply() function from the "Multiplying Two Numbers" problem, write a function that computes the square of its argument (the square is the result of multiplying a number by itself).

// function square(num) {
//   return multiply(num, num)
// }
// // console.log(square(8))
// // console.log(square(5) === 25); // logs true
// // console.log(square(-8) == 64); // logs true

// function power(num,n){
//   return multiply(num)
// }

// function square(arg) {
//   return func(arg, arg)}
// console.log(square(5) === 25)
// console.log(square(-8) == 64)

//program that prompts the user for two positive integers, and then prints the results of the following operations on those two numbers: addition, subtraction, product, quotient, remainder, and power.

// let first = Number(readlineSync.question("Enter a number "))
// let second = Number(readlineSync.question("Enter a number"))
// console.log(`${first + second}`)
// console.log(`${first - second}`)
// console.log(`${first * second}`)
// console.log(`${first / second}`)
// console.log(`${first % second}`)
// console.log(`${first ** second}`)


// #6
// Write a function that returns the next to last word in the String passed to it as an argument.
// Example: console.log(penultimate("last word") === "last"); // logs true

// function penultimate(str) {
//   let arr = str.split(" ")
//   return arr[arr.length - 2]
// }
// console.log(penultimate("last word") === "last"); // logs true
// console.log(penultimate("Launch School is great!") === "is"); // logs true

//further exploration:
// Our solution ignored a couple of edge cases because we explicitly stated that you didn't have to handle them: strings that contain just one word, and strings that contain no words. Suppose we need a function that retrieves the middle word of a phrase/sentence. What edge cases need to be considered? How would you handle those edge cases without ignoring them? Write a function that returns the middle word of a phrase or sentence. It should handle all of the edge cases you thought of.

//ideal: array of odd # of elements
//edge cases: even # of elements, no elements, 1 element
// function penultimate(str) {
//   if (str.trim() === "") {
//     return "empty string"
//   } else if (str.split(" ").length === 1) {
//     return "just 1 element"
//   } else if (str.split(" ").length % 2 === 0) {
//     return "even # of elements"
//   } else {
//     let arr = str.split(" ")
//     return arr[Math.floor(arr.length / 2)]
//   }
// }
// console.log(penultimate("hello big man"))
// console.log(penultimate("hello big"))
// console.log(penultimate("hello"))
// console.log(penultimate("  "))


//#7 - write a function named xor that takes two arguments, and returns true if exactly one of its arguments is truthy, false otherwis

// function xor(a, b) {
//   if ((a && !b) || (!a && b)) {
//     return true
//   }
//   else { return false }
// }
// console.log(xor(1, 1))
// console.log(xor(0, 0))
// console.log(xor(undefined, null))

// #8
// Write a function that returns an Array that contains every other element of an Array that is passed in as an argument. The values in the returned list should be those values that are in the 1st, 3rd, 5th, and so on elements of the argument Array.
// Examples:
// console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]


// function oddities(array) {
//   let newArray = []
//   for (let i = 0; i < array.length; i += 2) {
//     newArray.push(array[i])
//   }
//   return newArray
// }
// console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
// console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
// console.log(oddities(["abc", "def"])); // logs ['abc']
// console.log(oddities([123])); // logs [123]
// console.log(oddities([])); // logs []

// function oddities(array) {
//   let newArray = array.filter((each, index) => index % 2 === 0)
//   return newArray
// }


// #9
// console.log(stringToInteger("4321") === 4321); // logs true
// console.log(stringToInteger("570") === 570); // logs true

// function stringToInteger(string) {
//   const DIGITS = {
//     0: 0,
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 7,
//     8: 8,
//     9: 9
//   };
//   let arrayOfDigits = string.split("").map(char => DIGITS[char]);
//   let value = 0;
//   arrayOfDigits.forEach(digit => (value = (10 * value) + digit));
//   return value;
// }
// //#10 - continuation from above
// function stringToSignedInteger(string) {
//   switch (string[0]) {
//     case "-":
//       return -stringToInteger(string.slice(1, string.length));
//     case "+":
//       return stringToInteger(string.slice(1, string.length));
//     default:
//       return stringToInteger(string);
//   }
// }

// #11
// console.log(integerToString(4321));      // "4321"

// function integerToString(num) {
//   let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
//   let result = ""
//   do {
//     let remainder = num % 10
//     num = Math.floor(num / 10)
//     result = arr[remainder] + result
//   } while (num > 0)
//   return result
// }

// #12
// function signedIntegerToString(number) {
//   switch (Math.sign(number)) {
//     case -1:
//       return `-${integerToString(-number)}`;
//     case +1:
//       return `+${integerToString(number)}`;
//     default:
//       return integerToString(number);
//   }
// }