// // #1
[1, 2, 3].filter(num => 'hi');
//[ 1, 2, 3 ]

// // #2
[1, 2, 3].map(num => {
  num * num;
});
//[ undefined, undefined, undefined ]
//there's no explicit return statement in the callback function, which means that the callback returns undefined each time.

// // #3
[1, 2, 3].map(num => num * num);
// [ 1, 4, 9 ]
// Without braces surrounding the body of the arrow function, JavaScript uses the computed value as the return value. In this case, the callback returns 1, 4, and 9 on the 3 iterations.

// // #5
[1, 2, 3].every(num => {
  return num = num * 2;
});
// 2
// 4
// 6
// true

// // #7
['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
});
//[ undefined, 'bear' ]
// for the first element, 'ant', the condition evaluates to false and elem isn't returned.
// ----->>>>>When a function doesn't explicitly return something, it implicitly returns undefined. That's why we see undefined as the first element of the returned array.

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
// Write a program that uses this array to create an object where the names are the keys and the values are the positions in the array:
// function flint(arr) {
//   let obj = {}
//   for (let i = 0; i < arr.length; i++) {
//     let currentIndex = i
//     let currentValue = arr[i]
//     obj[currentValue] = currentIndex}
//   return obj}
// console.log(flint(flintstones))
// OR
//using forEach method passing it 2nd argument index
// let flintstonesObj = {};
// flintstones.forEach((name, index) => {
//   flintstonesObj[name] = index;
// });

// // #9
// Add up all of the ages from the Munster family object:
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10, Marilyn: 22, Spot: 237 };
// let arr = Object.values(ages)
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//   sum = sum + arr[i]}
// console.log(sum)
// //         OR             using forEach
// let totalAge = 0
// Object.values(ages).forEach(age => totalAge += age)
// totalAge
// //                       OR reduce
Object.values(ages).reduce((agesSum, currAge) => agesSum + currAge, 0);

// // // #10
// // Pick out the minimum age from our current Munster family object:
// console.log(Object.values(ages).sort((a, b) => a - b).shift())
// //         OR
// let agesArray = Object.values(ages)
// console.log(Math.min(...agesArray))

// // // #11   ******to review******
// // Create an object that expresses the frequency with which each letter occurs in this string:
// let statement = "The Flintstones Rock";
// let allChars = statement.split("").filter(each => each !== " ")
// let newObj = {}
// //one way using short circuiting:
// allChars.forEach(each => {
//   newObj[each] = newObj[each] || 0
//   newObj[each] += 1})
// //without the short circuiting:
// allChars.forEach(each => {
//   if (Object.keys(newObj).includes(each)) {
//     result[char] += 1;
//   } else {
//     result[char] = 1;
// }})
// //or acting just on the string w/o forEach:
// let result = {};
// for (let counter = 0; counter < statement.length; counter += 1) {
//   let char = statement[counter];
//   if (char === ' ') continue;
//   result[char] = result[char] || 0;
//   result[char] += 1;}

