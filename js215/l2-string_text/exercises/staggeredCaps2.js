//Modify the function from the previous exercise so that it ignores non-alphabetic characters when determining whether a letter should be upper or lower case. Non-alphabetic characters should still be included in the output string, but should not be counted when determining the appropriate case.

console.log(staggeredCase('I Love Launch School!'));        // "I lOvE lAuNcH sChOoL!"
console.log(staggeredCase('ALL CAPS'));                     // "AlL cApS"
console.log(staggeredCase('ignore 77 the 444 numbers'));    // "IgNoRe 77 ThE 444 nUmBeRs"


function staggeredCase(str) {
  let newstr = '';

  let toggle = true;
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      if (toggle) {
        newstr += str[i].toUpperCase()
        //toggle = !toggle
      } else {
        newstr += str[i].toLowerCase()
        //toggle = !toggle
      }
      toggle = !toggle
    } else {
      newstr += str[i]
    }
  }
  return newstr;
}
