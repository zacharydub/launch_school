//Write a function that takes a string, and returns an object containing the following three properties:
//
//    the percentage of characters in the string that are lowercase letters
//    the percentage of characters that are uppercase letters
//    the percentage of characters that are neither
//
//You may assume that the string will always contain at least one character.

//given input string, return obj with props for the cases and non-letters
//input:str || output: obj
algo:
//iterate thru str
//for each char, determine if upper, lower, or neither - and increment count of that letter
//at end of iteration, create obj with props set to count of each / length

function letterPercentages(str) {
  let [upper, lower, neither] = [0, 0, 0];

  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/)) {
      lower++
    } else if ((str[i].match(/[A-Z]/))) {
      upper++
    } else {
      neither++
    }
  }
  return {
    'lowercase': ((lower / str.length) * 100).toFixed(2),
    'uppercase': ((upper / str.length) * 100).toFixed(2),
    'neither': ((neither / str.length) * 100).toFixed(2)
  }
}
console.log(letterPercentages('abCdef 123'));
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

console.log(letterPercentages('AbCd +Ef'));
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

console.log(letterPercentages('123'));
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }
console.log(letterPercentages([]))
console.log(letterPercentages(''))
console.log(letterPercentages({}))


//ALTERNATIVE - MORE CONCISE:
function letterPercentages(string) {
  const count = string.length;
  return {
    lowercase: (((string.match(/[a-z]/g) || []).length / count) * 100).toFixed(2),
    uppercase: (((string.match(/[A-Z]/g) || []).length / count) * 100).toFixed(2),
    neither: (((string.match(/[^a-z]/gi) || []).length / count) * 100).toFixed(2),
  };
}
