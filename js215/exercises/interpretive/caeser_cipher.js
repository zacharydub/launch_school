//Write a function that implements the Caesar Cipher. The Caesar Cipher is one of the earliest and simplest ways to encrypt plaintext so that a message can be transmitted securely. It is a substitution cipher in which each letter in a plaintext is substituted by the letter located a given number of positions away in the alphabet. For example, if the letter 'A' is right-shifted by 3 positions, it will be substituted with the letter 'D'. This shift value is often referred to as the key. The "encrypted plaintext" (ciphertext) can be decoded using this key value.

//The Caesar Cipher only encrypts letters (including both lower and upper case). Any other character is left as is. The substituted letters are in the same letter case as the original letter. If the key value for shifting exceeds the length of the alphabet, it wraps around from the beginning.
// simple shift
console.log(caesarEncrypt('A', 0));       // "A"
console.log(caesarEncrypt('A', 3));       // "D"
//// wrap around
console.log(caesarEncrypt('y', 5));       // "d"
console.log(caesarEncrypt('a', 47));      // "v"
//// all letters
console.log(caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25));
//// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
console.log(caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5));
//// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"
//// many non-letters
console.log(caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2));
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"

//replace each letter in the input string with a ciphered substitute letter
//input:str and integer || output: ciphered string

//rules:
//substitue each letter only - non-letters are not to be substitued and should remain as-is
//keep case
//wrap around if letter+cipher number exceeds alphabet total

//algo
//initialize 2 arrays of alphabet - upper and lower
//initialize return string
//iterate thru input string
//for each char:
//  check if letter
//      if not, pass as- is
//      if yes, check case
//if lower, use lower array
//if higher, use higher array
//helper func to substitue letter
//helper algo:
//given letter and number, start with index / letter and move forward number positions in array.if index + number(sum) is greater than 25, use arr[(47 + (index - 1)) % 25]), where index is the index of the given letter

function caesarEncrypt(str, num) {
  let returnStr = '';
  let alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (let i = 0; i < str.length; i++) {
    let letterCheck = str[i].match(/[a-z]/i);
    if (!letterCheck) {
      returnStr += str[i];
    }
    if (letterCheck) {
      if (str[i].match(/[A-Z]/)) {
        let uppers = alpha.map(elm => elm.toUpperCase());
        returnStr += swapLetter(str[i], num, uppers);
      } else {
        returnStr += swapLetter(str[i], num, alpha);
      }
    }
  }
  return returnStr;
}

function swapLetter(char, num, arr) {
  let index = arr.indexOf(char);
  let sum = index + num;
  return arr[(sum) % 26];
}
