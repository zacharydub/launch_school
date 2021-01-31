//Write a program that cleans up user-entered phone numbers so that they can be sent as SMS messages. Other than digits, the number may also contain special character such as spaces, dash, dot, and parentheses that should be ignored.
//
//The rules are as follows:
//
//    If the phone number is less than 10 digits, assume that it is a bad number.
//    If the phone number is 10 digits, assume that it is good.
//    If the phone number is 11 digits and the first number is 1, trim the 1 and use the last 10 digits.
//    If the phone number is 11 digits and the first number is not 1, then it is a bad number.
//    If the phone number is more than 11 digits, assume that it is a bad number.
//
//For bad numbers, just a return a string of 10 0s.

//sanitize inputs
//input: number || output: string
//rules
//test cases:
console.log(sanitize('12345')) //bad
console.log(sanitize('1234567890')) //good
console.log(sanitize('11234567890')) //good - trim the 1st digit
console.log(sanitize('21234567890')) // bad - 11 digits and starts with non-1
console.log(sanitize('111234567890')) // bad - 12 digits
console.log(sanitize('32434')) // bad
console.log(sanitize('123.4567890')) //good
console.log(sanitize('123-4567890')) //good
console.log(sanitize('123(4567890')) //good
console.log(sanitize('123 4567890')) //good
console.log(sanitize('123 avd!?4567890'))


//algo:
//remove non-numbers
//count digits
//if less than 10, bad
//if more than 11, bad
//if 11, check first digit - if not 1, bad
//else if 10, good

function sanitize(input) {
  let bad = '0000000000'
  //'0'.repeat(10)


  let arr = input.split('')
  let sanitizedArr = arr.filter(char => char.match(/\d/))
  //input.replace(/\D/g,'')

  if (sanitizedArr.length < 10 || sanitizedArr.length > 11) {
    return bad
  } else if (sanitizedArr.length === 11) {
    if (sanitizedArr[0] !== '1') {
      return bad;
    } else {
      return sanitizedArr.slice(1).join('')
    }
  }
  return sanitizedArr.join('')
}
