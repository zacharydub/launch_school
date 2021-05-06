//A collection of spelling blocks has two letters per block, as shown in this list:
//
//B:O   X:K   D:Q   C:P   N:A
//G:T   R:E   F:S   J:W   H:U
//V:I   L:Y   Z:M
//
//This limits the words you can spell with the blocks to only those words that do not use both letters from any given block. You can also only use each block once.
//Write a function that takes a word string as an argument, and returns true if the word can be spelled using the set of blocks, or false otherwise. You can consider the letters to be case-insensitive when you apply the rules.

//assess if given word can be spelled using only 1 each of a set of letters pairs
//input: string || output: true/false
console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('floW'));       // true
console.log(isBlockWord('APPLE'));      // false
console.log(isBlockWord('apple'));      // false
console.log(isBlockWord('apPLE'));      // false
console.log(isBlockWord('Box'));        // false
//rules:
//each pair can only be used once - afterward, they are to be removed from contention
//case-insensitive

//algo
//hold letter pairs as nested arrays inside an array
//iterate thru input word - for every letter, check if that letter exists in nested arrays. if so, remove that nested array. if not, return false. at end return true
function isBlockWord(str) {
  let arr = [['B', 'O'], ['X', 'K'], ['D', 'Q'], ['C', 'P'], ['N', 'A'],
  ['G', 'T'], ['R', 'E'], ['F', 'S'], ['J', 'W'], ['H', 'U'],
  ['V', 'I'], ['L', 'Y'], ['Z', 'M']];

  let used = [];
  str = str.toUpperCase();

  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].includes(letter)) {
        if (used.includes(letter)) {
          return false;
        } else {
          used.push(arr[j][0], arr[j][1]);
        }
      }
    }
  }
  return true;
}
