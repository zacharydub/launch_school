//Write a function that takes a grocery list (a two-dimensional array) with each element containing a fruit and a quantity, and returns a one-dimensional array of fruits, in which each fruit appears a number of times equal to its quantity.

console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]));
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

//iterate thru array - for each element, get x amount of elm 0 based on elm 1

//function buyFruit(arr) {
//  let newarr = [];
//  for (let i = 0; i < arr.length; i++) {
//    let count = arr[i][1]
//    for (let j = count; j > 0; j--) {
//      newarr.push(arr[i][0])
//    }
//  }
//  return newarr
//}
function buyFruit(fruitsList) {
  return fruitsList.map(repeat)
    .reduce((groceryList, fruit) => groceryList.concat(fruit));
}

function repeat(fruit) {
  const result = [];

  for (let i = 0; i < fruit[1]; i += 1) {
    result.push(fruit[0]);
  }

  return result;
}
