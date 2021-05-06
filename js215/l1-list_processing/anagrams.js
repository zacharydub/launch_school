//Write a Function named anagram that takes two arguments: a word and an array of words. Your function should return an array that contains all the words from the array argument that are anagrams of the word argument. For example, given the word "listen" and an array of candidate words like "enlist", "google", "inlets", and "banana", the program should return an array that contains "enlist" and "inlets".

function anagram(word, array) {
  return array.filter(elm => isAnagram(elm, word))
}
function isAnagram(arrayElm, input) {
  if (arrayElm.length !== input.length) return false;

  let sortedElm = arrayElm.split('').sort()
  let sortedWord = input.split('').sort()

  //for (let i = 0; i < sortedElm.length; i++) {
  //  if (sortedElm[i] !== sortedWord[i]) return false;
  //}
  //return true;
  return sortedElm.every((letter, index) => letter === sortedWord[index])
}
console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]


//algo
//input:word and array || output: array of anagrams
//iterate thru array input. for each one, check if anagram of word - helper func

//check if anagram:
//first, check if same amount of letters
//if so, sort
//iterate thru and make sure each matches
