//from previous exercise:
function leadingSubstrings(string) {
  let substrings = [];
  for (let length = 1; length <= string.length; length += 1) {
    substrings.push(string.slice(0, length));
  }

  return substrings;
}

//Write a function that returns a list of all substrings of a string. Order the returned list by where in the string the substring begins. This means that all substrings that start at index position 0 should come first, then all substrings that start at index position 1, and so on. Since multiple substrings will occur at each position, return the substrings at a given index from shortest to longest.

//You may (and should) use the leadingSubstrings function you wrote in the previous exercise:

function substrings(string) {
  let allsubs = [];
  for (let i = 0; i <= string.length; i++) {
    let subs = leadingSubstrings(string.slice(i))
    allsubs = allsubs.concat(subs)
  }
  return allsubs;
}
console.log(substrings('abcde'));
