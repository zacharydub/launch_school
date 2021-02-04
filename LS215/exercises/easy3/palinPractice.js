//get all pals

let str = 'hello'
console.log(substrings(str))

function substrings(string) {
  let subs = []
  for (let i = 0; i < string.length; i++) {
    for (let j = i + 1; j <= string.length; j++) {
      subs.push(str.slice(i, j))
    }
  }
  return subs;
}

function isPal(str) {
  let subs = substrings(str);

  return subs.filter(elm => elm === elm.split('').reverse().join('') && elm.length > 1)
}

console.log(isPal('hello'))
