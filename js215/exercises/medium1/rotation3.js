//Take the number 735291 and rotate it by one digit to the left, getting 352917. Next, keep the first digit fixed in place and rotate the remaining digits to get 329175. Keep the first two digits fixed in place and rotate again to get 321759. Keep the first three digits fixed in place and rotate again to get 321597. Finally, keep the first four digits fixed in place and rotate the final two digits to get 321579. The resulting number is called the maximum rotation of the original number.
//
//Write a function that takes an integer as an argument, and returns the maximum rotation of that integer. You can (and probably should) use the rotateRightmostDigits function from the previous exercise.
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

console.log(maxRotation(735291));          // 321579
console.log(maxRotation(3));               // 3
console.log(maxRotation(35));              // 53
console.log(maxRotation(105));             // 15 -- the leading zero gets dropped
console.log(maxRotation(8703529146));      // 7321609845

//algo
//convert input to string to array
//make loop for array.length-2 iterations
//  on each iteration, rotate the number using previous function, where n is array.length -1, which decreases by 1 after each iteration

function maxRotation(num) {
  let str = String(num)
  for (let i = 0; i <= str.length - 2; i++) {
    num = rotateRightmostDigits(num, str.length - i)
  }
  return num
}
