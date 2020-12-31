// Write code that capitalizes the words in the string 'launch school tech & talk', so that you get the string 'Launch School Tech & Talk'.

let string = 'launch school tech & talk';
let words = string.split(' ');
let capitalizedWords = [];
let i;
for (i = 0; i < words.length; i++) {
  let word = words[i];
  capitalizedWords.push(word[0].toUpperCase() + word.slice(1));
}
capitalizedWords.join(' ')
