//nested arrays
//nested objects in arrays

//variables as pointers:
let a = [1, 3];
let b = [2];
let arr = [a, b];
arr; // => [ [ 1, 3 ], [ 2 ] ]
a[1] = 5;
arr; // => [ [ 1, 5 ], [ 2 ] ] ------>> changing the variable 'a' also changed the contents of arr.
// What if we modify the first array in arr?
arr[0][1] = 8;
arr; // => [ [ 1, 8 ], [ 2 ] ]
a;   // => [ 1, 8 ]
// ----->> It produces the same result as modifying a directly. 

//shallow copying arrays:
//first, 2 methods to copy an array: slice() or let copyOfArr = [...arr];
// Both techniques create a shallow copy of an array: only the top level array is copied. When the array contains other objects, like a nested array, then those objects are shared, not copied. That has major ramifications for nested collections:

let arr = [['a'], ['b'], ['c']];
let copyOfArr = arr.slice();
copyOfArr[1].push('d');
arr;       // => [ [ 'a' ], [ 'b', 'd' ], [ 'c' ] ] ----->>> original arr was modified. This is because push() was called on a 'shared array object' rather than a separate array. When you mutate a shared object in an array or other collection, it is the shared object you are affecting rather than the collection.
copyOfArr; // => [ [ 'a' ], [ 'b', 'd' ], [ 'c' ] ]
//example with arra of simple objects:
let arr = [{ a: 'foo' }, { b: 'bar' }, { c: 'baz' }];
let copyOfArr = [...arr];
copyOfArr[1].d = 'qux';
arr;       // => [ { a: 'foo' }, { b: 'bar', d: 'qux' }, { c: 'baz' } ] ---->> original arr was modified
copyOfArr; // => [ { a: 'foo' }, { b: 'bar', d: 'qux' }, { c: 'baz' } ]
// The critical thing to be aware of is what level you're working at, especially when working with nested collections and using variables as pointers; are you working at the level of an outer array or object, or at the level of an object within that?

//shallow copying objects:
let obj = { a: 'foo', b: 'bar' };
let copyOfObj = Object.assign({}, obj);
copyOfObj; // => { a: 'foo', b: 'bar' }
// To verify that it's indeed a copy, we can modify the copy and check whether the original is affected by the modification.
copyOfObj['c'] = 'baz';
copyOfObj; // => { a: 'foo', b: 'bar', c: 'baz' }
obj;       // => { a: 'foo', b: 'bar' }

// Note that Object.assign only creates a shallow copy of the object. That is, changes to nested objects within the copy will be reflected in the original:
let obj = { a: { b: 'foo' }, c: ['bar'] };
let copyOfObj = Object.assign({}, obj);
obj['a']['d'] = 'baz';
copyOfObj; // => { a: { b: 'foo', d: 'baz' }, c: [ 'bar' ] }
obj;       // => { a: { b: 'foo', d: 'baz' }, c: [ 'bar' ] }
// ----->>  be aware that when you make a copy of a collection object that it is a shallow copy - the objects within the collections are shared between the copy and the original.

//deep copy 
//no explicit method, rather just indirect using JSON stringify and parse. owever, it only works with nested arrays and plain objects. Objects that have methods and complex objects like dates or custom objects cannot be deep-cloned with this technique.
let arr = [{ b: 'foo' }, ['bar']];
let serializedArr = JSON.stringify(arr);
let deepCopiedArr = JSON.parse(serializedArr);
// The JSON.stringify function serializes any object, including arrays, that only have primitives, arrays, and plain objects as elements.

//freezing objects
let obj = Object.freeze({ a: 'foo' });
let arr = Object.freeze(['a', 'b', 'c']);

obj['b'] = 'bar';
obj; // => { a: 'foo' }
arr.push('d'); // => TypeError: Cannot add property 3, object is not extensible
arr; // => [ 'a', 'b', 'c' ]
// Only mutable objects can be frozen with Object.freeze since immutable objects, like integers or strings(see next line), are already frozen.
Object.isFrozen('abc'); // => true

//only freezes the object that is passed to it. If the object passed to it contains other objects, those objects won't be frozen. For example, if we have a nested array, the nested objects can still be modified after passing it to Object.freeze.
let arr = Object.freeze([[1], [2], [3]]);
arr[2].push(4);
arr; // =>  [ [ 1 ], [ 2 ], [ 3, 4 ] ]
//This behavior also applies to objects within arrays, objects within objects and arrays within objects.