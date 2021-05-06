//Write a function that rotates the last n digits of a number. For the rotation, rotate by one digit to the left, moving the first digit to the end.

console.log(rotateRightmostDigits(735291, 1));      // 735291
console.log(rotateRightmostDigits(735291, 2));      // 735219
console.log(rotateRightmostDigits(735291, 3));      // 735912
console.log(rotateRightmostDigits(735291, 4));      // 732915
console.log(rotateRightmostDigits(735291, 5));      // 752913
console.log(rotateRightmostDigits(735291, 6));      // 352917
console.log(rotateRightmostDigits('a', 5))
console.log(rotateRightmostDigits(5, 'a'))
console.log(rotateRightmostDigits(45, 3))
//rotate (i.e. move to the left) n digits of a given number
//input:2 numbers || output: number

//algo
//check inputs
//both need to be numbers
//2nd input can be max the length of the first
//convert to string to array
//the 2nd number represents which index to move to the end - that elm needs to be spliced and then pushed
//i.e. 2 is actually array.length - 2

function rotateRightmostDigits(num, n) {
  if (typeof num !== 'number' || typeof n !== 'number') return undefined;

  let stringed = String(num);
  if (n > stringed.length) return undefined;

  let arr = stringed.split('');
  let removeIndex = arr.length - n;
  let removed = arr.splice(removeIndex, 1);
  arr.push(removed);
  return Number(arr.join(''))
}
