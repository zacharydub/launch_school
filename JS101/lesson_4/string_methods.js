// string methods
//  // all return new string as strings are immutable primitives

//concat 
// let str1 = 'Hello'
// let str2 = 'World!'
// str1.concat('th ', ' ', str2)
// //'Helloth  World!'

// includes
// 'abcdefg'.includes('b', 2)
// // false

// // split
// 'abcdef'.split('')
// //['a', 'b', 'c', 'd', 'e', 'f']
// 'Eeny, meeny, miny, moe'.split(', ')
// //[ 'Eeny', 'meeny', 'miny', 'moe' ]

//trim 
// '  abcdef   '.trim()
// // 'abcdef'
// '\nabcdef\t'.trim()
// // 'abcdef'
// > '  abcdef  '.trimStart()
// 'abcdef  '
// > '  abcdef  '.trimEnd()
// '  abcdef'

// function capitalize(str) {
//   return str[0].toUpperCase() + str.slice(1);
// }
// capitalize('pete'); // => 'Pete'

// let sentence = "It's a walk in the park."
// sentence.charAt(5)
// // 'a'
// The chief difference between charAt and [] occurs when using indexes for characters that don't exist: charAt returns an empty string (''), while [] returns undefined:
// charCodeAt(i) returns the Unicode code point or character code 
// 'abcdef'.charCodeAt(1)
// 98 
// If you don't provide an index, charCodeAt assumes the index 0.
// 'abcdef'.charCodeAt()
// 97 // the character code for 'a'
// String.fromCharCode(97)
'a'
// fromCharCode is not a prototype method. It's instead what we call a static method or a function. We can't call fromCharCode directly on a string; instead, it must be called on the constructor String

// // String.prototype.endsWith
// let str = 'To be, or not to be, that is the question.'
// console.log(str.endsWith('question.'))  // true
// console.log(str.endsWith('to be'))      // false
// console.log(str.endsWith('to be', 19))  // true
// // String.prototype.startsWith
// const str1 = 'Saturday night plans';
// console.log(str1.startsWith('Sat'));
// // expected output: true
// console.log(str1.startsWith('Sat', 3));
// // expected output: false
// // String.prototype.repeat
// 'abc'.repeat(1)     // 'abc'
// 'abc'.repeat(2)     // 'abcabc'


