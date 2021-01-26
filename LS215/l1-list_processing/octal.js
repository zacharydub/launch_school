//Write a Function named octalToDecimal that performs octal to decimal conversion. When invoked on a String that contains the representation of an octal number, the Function returns a decimal version of that value as a Number. Implement the conversion yourself: do not use something else to perform the conversion for you.

//algo
//get length of string - 3
//iterate thru string starting backwards - string[3]
//multiply last index by 8^0, next by 8^1...

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'))          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9

function octalToDecimal(str) {
  //  let count = 0;
  //  let sum = 0;
  //  let stringlength = str.length;
  //
  //  for (stringlength - 1; stringlength > 0; stringlength--) {
  //    sum += str[stringlength - 1] * (8 ** count);
  //    count++;
  //  }
  //  return sum;
  let parts = str.split('')
    .map((elm, index) => Number(elm) * Math.pow(8, str.length - index - 1));
  return parts.reduce((sum, num) => sum + num)

}

//OR
function octalToDecimal(numberString) {
  return numberString.split('').reduce((sum, digitChar, index) => {
    return sum + Number(digitChar) * Math.pow(8, numberString.length - index - 1);
  }, 0);
}
