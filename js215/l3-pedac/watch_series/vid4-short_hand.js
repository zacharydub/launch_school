//You are given a list of numbers in a "short-hand" range where only the significant part of the next number is written because we know the numbers are always increasing (ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]). Some people use different separators for their ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers [1, 2, 3, 11, 12]). Range limits are always inclusive.
//Your job is to return a list of complete numbers.
//
//The possible separators are: ["-", ":", ","]
//
console.log(separate("1, 3, 7, 2, 4, 1"))// --> 1, 3, 7, 12, 14, 21
console.log(separate("1-3, 1-2"))// --> 1, 2, 3, 11, 12
console.log(separate("1:5:2"))// --> 1, 2, 3, 4, 5, 6, ... 12
console.log(separate("104-2"))// --> 104, 105, ... 112
console.log(separate("104-02")) //--> 104, 105, ... 202
console.log(separate("545, 64:11"))// --> 545, 564, 565, .. 611

//get list of numbers from a shorthand string
//input:string || output: list of numbers

//rules:
//numbers are always increasing
//possible separators are ',' | '-' | ':'
//inclusive range limits
//if - OR : - expect list of consecutive numbers
//if , then next number is not consecutive
//there may be multiple kinds of separators in the input string

function separate(str) {
  let returnArr = [];
  const seps = ['-', ':', ','];

  let first = parseInt(str, 10);
  let firstLength = String(first).length;
  returnArr.push(String(first));

  let sep;
  for (let i = firstLength + 1; i < str.length; i++) {
    if (seps.indexOf(str[i]) !== -1) {
      sep = str[i];
      if (sep === '-' || sep === ":") {
        sep = 'consec';
      } else {
        sep = 'comma';
      }
      let shorty = parseInt(str.slice(i + 1), 10);
      let previous = returnArr[returnArr.length - 1];
      if (sep === 'consec') {
        let rangeNums = between(previous, shorty);
        returnArr = returnArr.concat(rangeNums);
      } else if (sep = 'comma') {
        let next = nextNum(previous, shorty);
        returnArr.push(next);
      }
    }
  }
  return returnArr;
}
//keep adding 1 to num1 until we get to a number that ends with num2
function between(num1, num2) {
  let iterator = num1;
  let returnArr = [Number(num1)];

  while (true) {
    iterator++
    returnArr.push(iterator)
    if (String(iterator).endsWith(String(num2))) break
  }
  return returnArr
}
function nextNum(num1, num2) {
  let iterator = num1;
  while (true) {
    iterator++
    if (String(iterator).endsWith(String(num2))) break
  }
  return String(iterator)
}

//algo
//initialize array to hold series of numbers
//create array that holds the separators
//iterate thru unput string
//get number before the first separator - push to array
  //iterate thru input string. stop when we get to a separator. the number that comes before the separator is our first number
//determine what kind of separator
  //if - OR : - expect list of consecutive numbers
  //if , then next number is not consecutive
//get next number. How do we find out what the shorthand if shorthand for? iterate +1 from previous number until we get to a number that ends with the shorthand number
