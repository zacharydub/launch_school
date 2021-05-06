function leadingSubstrings(string) {
  let substrings = [];
  for (let length = 1; length <= string.length; length += 1) {
    substrings.push(string.slice(0, length));
  }
  return substrings;
}

function substrings(string) {
  let allsubs = [];
  for (let i = 0; i <= string.length; i++) {
    let subs = leadingSubstrings(string.slice(i))
    allsubs = allsubs.concat(subs)
  }
  return allsubs;
}

console.log(palindromes('abcd'));       // []
console.log(palindromes('madam'));      // [ "madam", "ada" ]

console.log(palindromes('hello-madam-did-madam-goodbye'));
// returns
["ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
  "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
  "-madam-", "madam", "ada", "oo"]

console.log(palindromes('knitting cassettes'));
// returns
["nittin", "itti", "tt", "ss", "settes", "ette", "tt"]

function palindromes(string) {
  //get all subs
  let subs = substrings(string);

  //filter out palindromes
  return getPals(subs).filter(elm => elm.length > 1)
}

//iterate thru input array
//for each elm - convert to array and reverse and convert back to string - compare against original elm
function getPals(arr) {
  return arr.filter(elm => {
    let reversed = elm.split('').reverse().join('')
    return elm === reversed
  })
}
