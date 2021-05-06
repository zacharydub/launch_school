//It is quite common to find yourself in a situation where you need to perform a search on some data to find something you're looking for. Imagine that you need to search through the yellow pages to find the phone number of a particular business. A straightforward way to do this would be to go through the yellow pages one business at a time, checking if the current business name is the one you're trying to find.
//
//This may be a simple and easy way to search, but it's not very efficient. In the worst case scenario, it could mean having to search through every single business name before finding out that the business isn't listed—or, slightly better, having to go through every letter from 'A' to 'Z' before finding the business. A linear search such as this can take quite a long time.
//
//A binary search algorithm is a much more efficient alternative. This algorithm allows you to cut the search area in half on each iteration by discarding the half that you know your search term doesn't exist in. The binary search algorithm is able to do this by relying on the data being sorted. Going back to the yellow pages example, let's say that we're searching the following yellowPages data for the search item 'Pizzeria':
//
//// Yellow pages list of business names data:
//const yellowPages = ['Apple Store', 'Bags Galore',
//                     'Bike Store',  'Donuts R Us',
//                     'Eat a Lot',   'Good Food',
//                     'Pasta Place', 'Pizzeria',
//                     'Tiki Lounge', 'Zooper'];
//
//With a linear search, we would have to sequentially go through each of the items until we found the search item 'Pizzeria'. In a binary search, however, the following sequence happens:
//
//    Retrieve the middle value from the data (assume truncation to integer) --> 'Eat a Lot'.
//    If the middle value is equal to 'Pizzeria', stop the search.
//    If the middle value is less than 'Pizzeria':
//        Discard the lower half, including the middle value --> ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot'].
//        Repeat the process from the top, using the upper half as the starting data --> ['Good Food', 'Pasta Place', 'Pizzeria', 'Tiki Lounge', 'Zooper'].
//    If the middle value is greater than 'Pizzeria', do the same as the previous step, but with opposite halves.
//
//Using the process described above, the search successfully ends on the second iteration when the middle value is 'Pizzeria'.
//
//Implement a binarySearch function that takes an array and a searchItem as arguments, and returns the index of the searchItem if found, or -1 otherwise. You may assume that the array argument will always be sorted.


const yellowPages = ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot', 'Good Food', 'Pasta Place', 'Pizzeria', 'Tiki Lounge', 'Zooper'];
//console.log(binarySearch(yellowPages, 'Pizzeria'));                   // 7
//console.log(binarySearch(yellowPages, 'Apple Store'));                // 0
let arr = [1, 5, 7, 11, 23, 45, 65, 89, 102]
console.log(binarySearch(arr, 70));    // -1
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89));    // 7
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 5));     // 1

console.log(binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Peter'));  // -1
console.log(binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Tyler'));  // 6

function binarySearch(arr, searchItem) {
  let copy = arr.slice()
  let middle;
  while (true) {
    middle = copy[Math.floor(copy.length / 2)];
    if (middle === searchItem) {
      return arr.indexOf(middle);
    } else if (middle < searchItem) {
      copy = copy.slice(copy.indexOf(middle) + 1)
    } else if (middle > searchItem) {
      copy = copy.slice(0, copy.indexOf(middle));
    }
    if (copy.length === 0) return -1
  }
}

//LS SOLUTION:
//function binarySearch(array, searchItem) {
//  let high = array.length - 1;
//  let low = 0;
//
//  while (low <= high) {
//    let mid = low + Math.floor((high - low) / 2);
//    if (array[mid] === searchItem) {
//      return mid;
//    } else if (array[mid] < searchItem) {
//      low = mid + 1;
//    } else {
//      high = mid - 1;
//    }
//  }
//
//  return -1;
//}
//The solution starts off by initializing the high and low variables. The difference between the two represents the current search area. The midpoint between the two (mid) is the index the solution uses to get the middle value from the array to compare with the searchItem argument.
//
//The solution uses a loop to iteratively search through the array. On each iteration, the solution computes the mid index value by adding the value of low to the integer result of dividing the current search area (high - low) in half. The solution then retrieves the value at the mid index position of the array and compares it to the searchItem. If they are equal, the solution returns the mid index. If the middle value is less than searchItem, the solution reassigns low to mid + 1 to remove the indices from low up to mid from the search area. If the middle value is greater than searchItem, the solution reassigns high to mid - 1 to remove the indices from mid up to high from the search area.
//
//If the value of low becomes greater than high, the search ends and the function returns -1—indicating that the searchItem could not be found.
