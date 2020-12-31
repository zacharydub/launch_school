//foreach
function forEach(array, callback, thisArg) {
    for (let index = 0; index < array.length; index += 1) {
        callback.call(thisArg, array[index], index, array);
    }
}
let arr = [1, 2, 3, 4];
// forEach(arr, value => console.log(value * value));
// forEach([1, 2, 3], foo.showItem, foo);


//filter
function filter(array, callback) {
    let arr = [];
    for (let index = 0; index < array.length; index += 1) {
        if (callback(array[index])) {
            arr.push(array[index]);
        }
    }
    return arr;
}
// let numbers = [1, 2, 3, 4, 5];
// console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
// console.log(filter(numbers, number => number < 0)); // => []
// console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

// let values = [1, "abc", null, true, undefined, "xyz"];
// console.log(filter(values, value => typeof value === "string"));
// => [ 'abc', 'xyz' ]

//map
function map(array, callback) {
    let mapped = [];
    for (let index = 0; index < array.length; index += 1) {
        mapped.push(callback(array[index]))
    }
    return mapped;
}

function map(array, callback) {
    return array.reduce((mapped, element) => {
        mapped.push(callback(element));
        return mapped;
    }, [])
}

// let numbers = [1, 2, 3, 4, 5];
// console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
// console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
// console.log(map(numbers, () => false));
// => [ false, false, false, false, false ]

let values = [1, "abc", null, true, undefined, "xyz"];
// console.log(map(values, value => String(value)));
// => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]


//reduce
function reduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let index = 0;

    if (accumulator === undefined) {
        accumulator = array[0];
        index = 1;
    }
    while (index < array.length) {
        accumulator = callback(accumulator, array[index]);
        index += 1;
    }
    return accumulator;

}

let numbers = [1, 2, 3, 4, 5];
// console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
// console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
// console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
// console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
// console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
// console.log(reduce(stooges, (reversedStooges, stooge) => {
//     reversedStooges.unshift(stooge);
//     return reversedStooges;
// }, []));
// => ["Curly", "Larry", "Mo"]