//Write a function that takes an array of strings, and returns an array of the same strings values without the vowels (a, e, i, o, u).
console.log(removeVowels(['abcdefghijklmnopqrstuvwxyz']));         // ["bcdfghjklmnpqrstvwxyz"]
console.log(removeVowels(['green', 'YELLOW', 'black', 'white']));  // ["grn", "YLLW", "blck", "wht"]
console.log(removeVowels(['ABC', 'AEIOU', 'XYZ']));                // ["BC", "", "XYZ"]

//function removeVowels(array) {
//  let vowels = 'aeiouAEIOU'.split('');
//
//  return array.map(elm => {
//    return elm.split('').filter(letter => {
//      return !vowels.includes(letter)
//    })
//  }).map(arr => arr.join(''))
//}

////USING REGEX
function removeVowels(array) {
  return array.map(elm => elm.replace(/[aeiou]+/ig, ''))
}
