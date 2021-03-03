
//remove all non-alpha chars
str.replace(/[^a-z]/ig, '')

//split acc to multiple delimeters
let regex = /[-\.:]/
let arr = 'he-l.l:o'.split(regex)

//check for a valid URL
str.match(/^https?:\/\/\S+$/)
//
let isUrl = function (text) {
  return !!text.match(/^https?:\/\/\S+$/);
};// !! to coerce result to boolean value

//email validation, given criteria:
////There must be one @ sign.
////The local part must contain one or more letters (A-Z, a-z) and/or digits (0-9). It may not contain any other characters.
////The domain part must contain two or more components with a single dot (.) between each component. Each component must contain one or more letters (A-Z, a-z) only.
function isValidEmail(email) {
  return /^[a-z0-9]+@([a-z]+\.)+[a-z]+$/i.test(email);
}


//using RegExp constructor
function searchWord(word, text) {
  const regex = new RegExp(word, 'gi');
  const matches = text.match(regex);

  return matches ? matches.length : 0;
}

function isBlockWord(word) {
  const blocks = ['B:O', 'X:K', 'D:Q', 'C:P', 'N:A', 'G:T', 'R:E', 'F:S', 'J:W', 'H:U', 'V:I', 'L:Y', 'Z:M'];
  const regExps = blocks.map(block => new RegExp(block.replace(':', '|'), 'gi'));
  return regExps.every(regExp => (word.match(regExp) || []).length < 2);
}
