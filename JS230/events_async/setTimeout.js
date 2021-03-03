//Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, etc. Note that the computation of the time is not dependent on when a previous number was logged. This means that for 10 numbers a total of 10 seconds would have passed.

function delayLog() {
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  }
}
delayLog()

//ALTERNATIVE
//function makeLogger(number) {
//  return function () {
//    console.log(number);
//  }
//}
//function delayLog() {
//  for (let index = 1; index <= 10; index += 1) {
//    let logger = makeLogger(index);
//    setTimeout(logger, index * 1000);
//  }
//}


//In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?
//setTimeout(() => {
//  setTimeout(() => {
//    q();
//  }, 15);
//
//  d();
//
//  setTimeout(() => {
//    n();
//  }, 5);
//
//  z();
//}, 10);
//
//setTimeout(() => {
//  s();
//}, 20);
//
//setTimeout(() => {
//  f();
//});
//
//g();
//SOLUTION:
//g, f, d, z, n, s, q

//Notice that g still comes before f even though the timeout duration defaults to 0. The reason for this behavior is that while the function can execute immediately already, it isn't until the next event cycle that it will execute.
//Another thing of note is that setTimeout's behavior can be unpredictable when the differences in duration are tiny. Consequently, the sequence you get may be different than the solutions.


//Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.
function afterNSeconds(cb, seconds) {
  setTimeout(cb, seconds * 1000)
}
