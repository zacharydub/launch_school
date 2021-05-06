//Write a function that takes a sentence string as an argument, and returns that string with every occurrence of a "number word" — 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' — converted to its corresponding digit character.
//
console.log(wordToDigit('Please call me at five five five one two three four. Thanks.'));
//// "Please call me at 5 5 5 1 2 3 4. Thanks."å

//algo
//convert to Array
//create obj with words as key and number as value
//Map
//
function wordToDigit(str) {
  const obj = { 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 }

  let arr = str.split(" ")
  let mapped = arr.map(elm => {
    if (obj[elm]) {
      return obj[elm]
    } else if (elm[elm.length - 1] === '.') {
      let truncated = elm.slice(0, -1)
      if (obj[truncated]) {
        return obj[truncated] + '.'
      } else {
        return elm
      }
    }
    else { return elm }
  })
  return mapped.join(" ")
}
