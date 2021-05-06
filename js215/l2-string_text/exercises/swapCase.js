//Write a function that takes a string as an argument, and returns that string with every lowercase letter changed to uppercase and every uppercase letter changed to lowercase. Leave all other characters unchanged.
console.log(swapCase('CamelCase'));              // "cAMELcASE"
console.log(swapCase('Tonight on XYZ-TV'));      // "tONIGHT ON xyz-tv"

function swapCase(str) {
  let newstr = ''
  for (let i = 0; i < str.length; i++) {
    //if (isUpper(str[i])) {
    if (str[i].match(/[A-Z]/)) {
      newstr += str[i].toLowerCase()
      //} else if (isLower(str[i])) {
    } else if (str[i].match(/[a-z]/)) {
      newstr += str[i].toUpperCase()
    } else {
      newstr += str[i]
    }
  }
  return newstr
}
//function isUpper(letter) {
//  return letter.match(/[A-Z]/)
//}
//function isLower(letter) {
//  return letter.match(/[a-z]/)
//}
