//Write a function that takes a string as an argument, and returns that string with a staggered capitalization scheme. Every other character, starting from the first, should be capitalized and should be followed by a lowercase or non-alphabetic character. Non-alphabetic characters should not be changed, but should be counted as characters for determining when to switch between upper and lower case.

console.log(staggeredCase('I Love Launch School!') === "I LoVe lAuNcH ScHoOl!")
staggeredCase('ALL_CAPS') === "AlL_CaPs"
staggeredCase('ignore 77 the 4444 numbers') === "IgNoRe 77 ThE 4444 nUmBeRs"

//iterate thru string. toggle true/false after each character. if true make char capital, if false make char lowercase

function staggeredCase(str) {
  let newstr = '';

  let toggle = true;
  for (let i = 0; i < str.length; i++) {
    if (toggle) {
      newstr += str[i].toUpperCase()
      toggle = false
    } else {
      newstr += str[i].toLowerCase()
      toggle = true
    }
  }
  console.log(newstr)
}
