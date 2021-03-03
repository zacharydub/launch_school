//Write a function named startCounting that logs a number to the console every second, starting with 1. Each number should be one greater than the previous number.
function startCounting() {
  let count = 0;
  setInterval(() => {
    count++
    console.log(count)
  }, 1000)
}

//Extend the code from the previous problem with a stopCounting function that stops the logger when called.
let clear;
function startCounting() {
  let count = 0;
  clear = setInterval(() => {
    count++
    console.log(count)
  }, 1000)
}
function stopCounting() {
  clearInterval(clear)
}
