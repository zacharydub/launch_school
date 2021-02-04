function fibonacci(nth) {
  let previousTwo = [1, 1];

  for (let counter = 3; counter <= nth; counter += 1) {
    previousTwo = [previousTwo[1], previousTwo[0] + previousTwo[1]];
  }

  return previousTwo[1];
}
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))

//The procedural solution uses an array, previousTwo, to store the values of the current two numbers in the Fibonacci series.
//
//The solution starts by initializing the previousTwo array to the first two numbers in the series.Using these numbers as a starting point, the solution loops and reassigns the value of previousTwo nth - 2 times.When the nth value to look for is one of the first two numbers, the solution does not need to iterate, and can return either value of the previousTwo array.The solution returns the second element so that when nth is greater than 2, the return value is still valid.
//
//For example, given an argument of 4, the values of previousTwo — starting with its initial value — are shown below:
//
//[1, 1]    // this is used as the return value for when `nth` is equal to 1 or 2
//[1, 2]    // nth = 3; returns previousTwo[1], or 2
//[2, 3]    // nth = 4; returns previousTwo[1], or 3
//
//If you run fibonacci(100), you will notice that there is a discrepancy in the result.This is because the size of the 100th Fibonacci number is very big.JavaScript does not handle big numbers well.In fact, running fibonacci(10000) returns Infinity, because the 10000th Fibonacci number is greater than the value of Number.MAX_VALUE.
