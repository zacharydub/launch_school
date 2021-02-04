//Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

//NEED TO UNDERSTAND PROBLEM BEFORE YOU CAN SOLVE IT
//what is 'zero'? string zero, or 0, or '0'
//spend time coming up with examples/test cases
//play around with given test cases
//alter chars to make other test cases
//see how you get from input to output - what intermediate steps are needed
//dont forget edge cases
//dont assume anything - always ask

moveZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]) // returns[false,1,1,2,1,3,"a",0,0]
moveZeros() // undefined
moveZeros([]) //undefined
moveZeros({}) //undefined
moveZeros('') //undefined
moveZeros([1, 2, 3]) // as-is [1,2,3]
moveZeros([0, 0, 0]) // as-is [0,0,0]
moveZeros([1, '0', 0])
moveZeros([1, '0', 'zero'])

//given input array, return (new) array with zeroes at end otherwise same order
//input: array || output: array

//rules:
//list zeroes at end
//preserve order of other elements

//algo:
//check inputs
  //if not array - no argument or non-array argument - return undefined
  //if array with no elements - return undefined
  //(maybe) check if array has no zeroes or only zeroes

//initialize 0 Array
//initialize return array
//iterate thru Array
//  for each Element, check if 0
//    if zero, push to zero array
//    if not, push to return arr
//concat zero array to return array
//return return array
