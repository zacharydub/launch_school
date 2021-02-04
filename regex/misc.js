
//remove all non-alpha chars
str.replace(/[^a-z]/ig, '')


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
