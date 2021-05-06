// #1
// Write a function that takes one argument, a positive integer, and returns the sum of its digits. Do this without using for, while, or do...while loops - instead, use a series of method calls to perform the sum.

sum(23);           // 5
sum(496);          // 19
sum(123456789);    // 45
// function sum(integer) {
//   let strArray = String(integer).split("")
//   console.log(strArray.reduce((a, b) => a + Number(b), 0))
// }

// #2
//Write a function that takes an array of integers between 0 and 19, and returns an array of those integers sorted based on the English word for each number: zero, one, two...etc
// alphabeticNumberSort(
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
// // [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]
// let NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
//   'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
//   'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

// function wordSort(num1, num2) {
//   if (NUMBER_WORDS[num1] > NUMBER_WORDS[num2]) {
//     return 1;
//   } else if (NUMBER_WORDS[num1] < NUMBER_WORDS[num2]) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// function alphabeticNumberSort(array) {
//   return array.sort((a,b)=>);
// } 

// #3
//Write a function that takes two array arguments, each containing a list of numbers, and returns a new array containing the products of all combinations of number pairs that exist between the two arrays. The returned array should be sorted in ascending numerical order.
// multiplyAllPairs([2, 4], [4, 3, 1, 2]);    // [2, 4, 4, 6, 8, 8, 12, 16]

// function multiplyAllPairs(array1, array2) {
//   let resultArray = []
//   // for (let i = 0; i < array1.length; i++) {
//   //   for (let j = 0; j < array2.length; j++) {
//   //     resultArray.push(array1[i] * array2[j])
//   //   }
//   // }
//   //OR
//   array1.forEach(each1 => {
//     array2.forEach(each2 => {
//       resultArray.push(each1 * each2)
//     })
//   })
//   resultArray.sort((a, b) => a - b)
//   console.log(resultArray)
// }

// #4
//Write a function that takes a string argument, and returns a list of all substrings that start from the beginning of the string, ordered from shortest to longest.

// leadingSubstrings('abc');      // ["a", "ab", "abc"]
// leadingSubstrings('a');        // ["a"]
// leadingSubstrings('xyzzy');    // ["x", "xy", "xyz", "xyzz", "xyzzy"]

// function leadingSubstrings(string) {
//   let array = string.split('')
//   for (let i = 1; i <= string.length; i++) {
//     array.push(string.substring(0, i))
//   }
//   return array
//   //   //OR
//   // let result = '';
//   // console.log(string.split('').map(ele => result += ele))
// }

// #5
//Write a function that returns a list of all substrings of a string. Order the returned list by where in the string the substring begins. This means that all substrings that start at position 0 should come first, then all substrings that start at position 1, and so on. Since multiple substrings will occur at each position, return the substrings at a given position from shortest to longest.
//previous function starts from index 0 and logs all sbstrings. Want to add another iteration for each index

// substrings('abcde');

// // returns
// // [ "a", "ab", "abc", "abcd", "abcde",
// //   "b", "bc", "bcd", "bcde",
// //   "c", "cd", "cde",
// //   "d", "de",
// //   "e" ]

// function substrings(string) {
//   let substrings = [];
//   for (let startIndex = 0; startIndex < string.length; startIndex += 1) {
//     let substring = string.substring(startIndex);
//     substrings = substrings.concat(leadingSubstrings(substring));
//   }
//   console.log(substrings)
// }

// function leadingSubstrings(string) {
//   let substrings = [];
//   for (let length = 1; length <= string.length; length += 1) {
//     substrings.push(string.slice(0, length));
//   }
//   return substrings;
// }

// // #6
// //Write a function that returns a list of all palindromic substrings of a string. 
// palindromes('abcd');       // []
// palindromes('madam');      // [ "madam", "ada" ]

// palindromes('hello-madam-did-madam-goodbye');
// returns
// [ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
//   "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
//   "-madam-", "madam", "ada", "oo" ]

// function isPalindrome(word) {
//   return word.length > 1 && word === word.split("").reverse().join("");
// }

// function palindromes(string) {
//   return substrings(string).filter(isPalindrome);
// }


// #7
//Write a function that takes an array of numbers, and returns the sum of the sums of each leading subsequence for that array. You may assume that the array always contains at least one number.

// sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
// sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
// sumOfSums([4]);              // 4
// sumOfSums([1, 2, 3, 4, 5]);  // 35

// function sumOfSums(numbers) {
//   let sumTotal = 0;
//   for (let idx = 1; idx <= numbers.length; idx++) {
//     sumTotal += numbers.slice(0, idx).reduce((accum, num) => accum + num);
//   }
//   return sumTotal;
// }
// //OR
// function sumOfSums(numbers) {
//   return numbers
//     .map((_, idx) =>
//       numbers.slice(0, idx + 1).reduce((sum, value) => sum + value)
//     )
//     .reduce((sum, value) => sum + value);
// }

// #8
//Write a function that takes a grocery list (a two-dimensional array) with each element containing a fruit and a quantity, and returns a one-dimensional array of fruits, in which each fruit appears a number of times equal to its quantity.

// buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
// // returns ["apple", "apple", "apple", "orange", "banana", "banana"]

// //loop throgh array. for each sb-array, add to new array the subarray[0] sub[1] times
// function buyFruit(array) {
//   let newArr = []
//   array.forEach(subarray => {
//     for (let i = 0; i < subarray[1]; i++) {
//       newArr.push(subarray[0])
//     }
//   })
//   return newArr
// }
// //OR
// function buyFruit(fruitsList) {
//   return fruitsList
//     .map(fruit => repeat(fruit))
//     .reduce((groceryList, fruit) => groceryList.concat(fruit));
// }

// function repeat(fruitAndQuantity) {
//   let result = [];
//   let fruit = fruitAndQuantity[0];
//   let quantity = fruitAndQuantity[1];

//   for (let num = 0; num < quantity; num += 1) {
//     result.push(fruit);
//   }

//   return result;
// }

// #9
// Write a function that takes two arguments, inventoryItem and transactions, and returns an array containing only the transactions for the specified inventoryItem.

// let transactions = [
//   { id: 101, movement: 'in', quantity: 5 },
//   { id: 105, movement: 'in', quantity: 10 },
//   { id: 102, movement: 'out', quantity: 17 },
//   { id: 101, movement: 'in', quantity: 12 },
//   { id: 103, movement: 'out', quantity: 20 },
//   { id: 102, movement: 'out', quantity: 15 },
//   { id: 105, movement: 'in', quantity: 25 },
//   { id: 101, movement: 'out', quantity: 18 },
//   { id: 102, movement: 'in', quantity: 22 },
//   { id: 103, movement: 'out', quantity: 15 },];

// console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]

function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(inventory => inventory.id === inventoryItem);
}

// #10
// Building on the previous exercise, write a function that returns true or false based on whether or not an inventory item is available. As before, the function takes two arguments: an inventory item and a list of transactions. The function should return true only if the sum of the quantity values of the item's transactions is greater than zero. Notice that there is a movement property in each transaction object. A movement value of 'out' will decrease the item's quantity.
// function isItemAvailable(id, array) {
//   let filtered = transactionsFor(id, array)
//   //id:23, movement:in. q:
//   // id:23, movement:out, q:
//   let qID = 0
//   filtered.forEach(obj => {
//     if (obj.movement === "in") {
//       qID += obj.quantity
//     }
//     if (obj.movement === "out") {
//       qID -= obj.quantity
//     }
//   })

//   return qID > 0
// }
// console.log(isItemAvailable(101, transactions));     // false
// console.log(isItemAvailable(103, transactions));     // false
// console.log(isItemAvailable(105, transactions));     // true
