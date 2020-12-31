// Variables as pointers

//variables with primitive values store those values in the variable,
//whereas, variables with non-primitives, store the value in memory (heap) and the variable itself gets stored to a value that references/points to the real value on the heap.

let a = 5
let b = a
a = 8
a
// 8
b
// 5

let c = [1, 2]
let d = c
c = [3, 4]
c
//[ 3, 4 ]
d
//[ 1, 2 ]

let e = [1, 2]
let f = e
e.push(3, 4)
e;
//[ 1, 2, 3, 4 ]
f;
//[ 1, 2, 3, 4 ] // this is the new behavior that illustrates the 'variables as pointers' idea

//Pointers can lead to surprising and unexpected behavior when two or more variables reference the same object in the heap. Primitive values don't have this problem.

// When using pointers, it's also important to keep in mind that some operations mutate objects, while others don't. For instance, push mutates an array, but map does not.

//Regex
//A regular expression—a regex—is a sequence of characters that you can use to test whether a string matches a given pattern:
/ o /.test('bobcat');
//true

/ l /.test('bobcat')
//false

// No match
"bobcat".match(/x/)
//null

// Global match
"bobcat".match(/[bct]/g)
//[ 'b', 'b', 'c', 't' ]

// Singular match with groups
"bobcat".match(/b((o)b)/)
//[ 'bob', 'ob', 'o', index: 0, input: 'bobcat', groups: undefined ]

// When a match occurs with a regex that contains the /g flag—a global match—the match method returns an array that contains each matching substring. The /g example above returns an array consisting of the matched b (twice, since it appears twice in the string), c, and t letters

// When /g isn't present, the return value for a successful match is also an array, but it includes some additional properties: index, input, and groups

//if just looking for a single match, TEST is better than MATCH and /g is inappropriate. 
//Beware mixing TEST and /g


//Exception handling
try {
  // perform an operation that may produce an error
} catch (exception) {
  // an error has occurred. do something about it here.
  // for example, log the error
} finally {
  // Optional 'finally' block; not used often
  // Executes even if an exception occurs.
}

let names = ['bob', 'joe', 'steve', undefined, 'frank'];

names.forEach(name => {
  try {
    console.log(`${name}'s name has ${name.length} letters in it.`);
  } catch (exception) {
    console.log('Something went wrong');
  }
}); // will print 'something went wrong' for the undefined data point, and still continue on to the 'frank' datapoint - this way the function wont stop midway when it encounters an exception

// It's also possible to raise your own exceptions. For instance:

function foo(number) {
  if (typeof number !== "number") {
    throw new TypeError("expected a number");
  }
}
// The 'throw' keyword raises an exception of the type specified as an argument, which is usually given as 'new' followed by one of the Error types described on this page. In this case, we use a 'TypeError' to indicate that we were expecting a different type for the 'number' argument.


// TypeError: Cannot read property 'length' of undefined
//     at names.forEach (repl:2:42)
//     at Array.forEach (<anonymous>)
// Above - This error message is a 'stack trace': it reports the type of error that occurred, where it occurred, and how it got there.

let x = 1
while (x <= 40) {
  if (x = 1) {
    console.log(x)
    continue;
  }
  if (x % 2 === 1) {
    console.log(x)
  }
  x++
}