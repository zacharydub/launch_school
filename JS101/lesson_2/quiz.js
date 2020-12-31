//#22 - functions and call stack:
// console.log(foo());
// function foo() {
//   console.log('Waiting for bar!');}
// function foo() {
//   console.log(foo);
//   function bar() {
//     console.log('bar again');}
//   bar();
//   function bar() {
//     console.log('bar again and again');}}
    // --> The correct sequence of log calls to the console is 6, 11, 2. The log call at line 1 only happens after the foo call. Note, too, that function declarations with the same name replace the previously defined function.

    //#23
    //'Function declarations' are statements that must begin with the function keyword