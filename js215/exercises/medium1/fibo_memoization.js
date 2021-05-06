//Our recursive fibonacci function from the previous exercise is not very efficient. It starts slowing down with an nth argument value as low as 35. One way to improve the performance of our recursive fibonacci function (and other recursive functions) is to use memoization.
//Memoization is an approach that involves saving a computed answer for future reuse, instead of computing it from scratch every time it is needed. In the case of our recursive fibonacci function, using memoization saves calls to fibonacci(nth - 2) because the necessary values have already been computed by the recursive calls to fibonacci(nth - 1).
//For this exercise, your objective is to refactor the recursive fibonacci function to use memoization.

//One approach to memoization is to use a lookup table, such as an object, for storing and accessing previously computed values.

const memo = {};

function fibonacci(nth) {
  if (nth <= 2) {
    return 1;
  } else {
    if (memo[nth]) {
      return memo[nth];
    } else {
      memo[nth] = fibonacci(nth - 1) + fibonacci(nth - 2);
      return memo[nth];
    }
  }
}
//The main difference of this solution is the addition of the memo object. In the outer else clause, the solution uses the memo object to look up whether a previous computation has already been done for the nth value. If it has, the function immediately returns that value; otherwise, the function computes the nth value, stores the result in the memo object, and returns it.
