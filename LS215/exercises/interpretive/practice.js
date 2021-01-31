let alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')

function swapLetter(char, num, arr) {
  let index = arr.indexOf(char);

  let sum = index + num;
  return arr[(sum) % 25];
}
console.log(swapLetter('a', 3, alpha))
