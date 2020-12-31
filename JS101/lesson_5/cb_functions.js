// In JavaScript, functions themselves are first-class values (or first-class objects). Not only can you invoke functions, but you can also pass them around your program like any other value.

//imperative (for loop) vs declarative (map method) approach:
// This declarative style of programming is possible only because we can treat functions as values. The map method takes a (cb) function as an argument and calls it for each element of the array used to call map. Functions that take other functions as arguments are called Higher Order Functions, as are functions that return other functions. 

[[1, 2], [3, 4]].forEach(arr => console.log(arr[0]));
// When evaluating code like this, ask the following questions:
// ----What type of action is being performed? Method call? Callback? Conditional? Something else?
// ----On what value is that action performed?
// ----What is the side-effect of that action (e.g., output or destructive action)?
// ----What is the return value of that action?
// ----Is the return value used by whatever instigated the action?

[[1, 2], [3, 4]].map(arr => {
  console.log(arr[0]);
  return arr[0];
});
// 1
// 3
// => [1, 3]

[[1, 2], [3, 4]].map(arr => {
  console.log(arr[0]);
  arr[0];
});

// 1
// 3
// => [undefined, undefined]

let myArr = [[18, 7], [3, 12]].forEach(arr => {
  return arr.map(num => {
    if (num > 5) {
      return console.log(num);
    }
  });
});
// 18
// 7
// 12
// => undefined
// When determining the return values, it's important to understand how the method used in the example works. In this case, we're using forEach on the outside, which ignores the return value of the callback. Thus, we can see that the value of myArr is undefined.

// the return value of every expression is important. You can ignore an expression's return value when it isn't used in the code. More often than not, though, some implied return value is used in subtle ways that affect your code. Pay attention to the details.

[{ a: 'ant', b: 'elephant' }, { c: 'cat', d: 'dog' }].filter(object => {
  return Object.keys(object).every(key => object[key][0] === key);
});
// => [ { c: 'cat', d: 'dog' } ]

[[8, 13, 27], ['apple', 'banana', 'cantaloupe']].map(arr => {
  return arr.filter(item => {
    if (typeof item === 'number') {    // if it's a number
      return item > 13;
    } else {
      return item.length < 6;
    }
  });
});
// => [ [ 27 ], [ 'apple' ] ]

[[[1], [2], [3], [4]], [['a'], ['b'], ['c']]].map(element1 => {
  return element1.forEach(element2 => {
    return element2.filter(element3 => {
      return element3.length > 0;
    });
  });
});
// => [ undefined, undefined ]
// forEach - we know that it doesn't care about the callback's return value and it always returns undefined. Therefore, just by looking at line 2, we can already say that the return value of map will be a new array that contains undefined values. 

[[[1, 2], [3, 4]], [5, 6]].map(arr => {
  return arr.map(elem => {
    if (typeof elem === 'number') { // it's a number
      return elem + 1;
    } else {                  // it's an array
      return elem.map(number => number + 1);
    }
  });
});
//[[2,3], [4,5]], [6,7]