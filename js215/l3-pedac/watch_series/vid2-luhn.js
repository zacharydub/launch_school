//The Luhn formula is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers Canadian Social Insurance Numbers.
//The formula verifies a number against its included check digit, which is usually appended to a partial number to generate the full number. This number must pass the following test:
//    Counting from the rightmost digit and moving left, double the value of every second digit
//    For any digit that thus become 10 or more, subtract 9 from the result
//        1111 becomes 2121
//        8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)
//    Add all these digits together
//        1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
//        8763 becomes 7733, and 7 + 7 + 3 + 3 is 20
//
//If the total (the checksum) ends in 0 (put another way, if the total modulo 10 is congruent to 0), then the number is valid according to the Luhn Formula; else it is not valid. Thus, 1111 is not valid (as shown above, it comes out to 6), while 8763 is valid (as shown above, it comes out to 20).
//Write a program that, given a number in string format, check if it is valid per the Luhn formula. This should treat, for example, "2323 2005 7766 3554" as valid. You can ignore all non-numeric characters in the input string.

//validate the input strings to ensure theyre valid according to a pattern
//input:string || output: boolean or valid/invalid
console.log(luhn('1111')) // false
console.log(luhn('8763')) // true
console.log(luhn('2323 2005 7766 3554')) // true
console.log(luhn('2323/2005 7766.3554')) // true
console.log(luhn('2323/2005 7767.3554')) // false
//rules
//iterate backwards
//double every 2nd digit (starting with 2nd digit from end) - ignoring non-numbers
//if any digit is 10+ when doubled, subtract 9 from it
//add all new digits together
//if sum's last digit is not zero, then invalid

//algo:
//iterate backwards
//convert to array and reverse.
//filter out non-numerics
//(map) double every 2nd - if any elm is greater than 10,subtract 9
//add new array elms together.
//if sum's last digit is zero (divisible by 10), then valid. Else, invalid

function luhn(str) {
  let cleanArr = str.split('').filter(elm => elm.match(/\d/)).reverse();

  let mapped = cleanArr.map((elm, index) => {
    if (index % 2 === 1) {
      let doubled = elm * 2;
      if (doubled >= 10) {
        doubled = doubled - 9;
      }
      return doubled;
    } else if (index % 2 === 0) {
      return Number(elm);
    }
  })

  return mapped.reduce((acc, cur) => acc + cur) % 10 === 0;

  //return sum % 10 === 0;
}

//now, write a 2nd function that can add a check digit to make the number valid per the Luhn formula and return the original number plus that digit. This should give '2323 2005 7766 3554' in response to input '2323 2005 7766 355'
function makeValid(string) {
  if (luhn(string)) return string;

  for (let i = 0; i <= 9; i++) {
    let newstr = string + String(i);
    if (luhn(newstr)) {
      return newstr;
    }
  }
}
console.log(makeValid('2323 2005 7766 355')) //'2323 2005 7766 3554'
console.log(makeValid('1111')) // 11114
console.log(makeValid('2324')) // 23242
console.log(makeValid('8763')) // 8763
