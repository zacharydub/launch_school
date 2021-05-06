//Merge sort is a recursive sorting algorithm that works by breaking down an array's elements into nested subarrays, then combining those nested subarrays back together in sorted order. It is best explained with an example. Given the array [9, 5, 7, 1], let's walk through the process of sorting it with merge sort. We'll start off by breaking the array down into nested subarrays:
//
//[9, 5, 7, 1] -->
//[[9, 5], [7, 1]] -->
//[[[9], [5]], [[7], [1]]]
//
//We then work our way back to a flat array by merging each pair of nested subarrays back together in the proper order:
//
//[[[9], [5]], [[7], [1]]] -->
//[[5, 9], [1, 7]] -->
//[1, 5, 7, 9]
//
//Write a function that takes an array, and returns a new array that contains the values from the input array in sorted order. The function should sort the array using the merge sort algorithm as described above. You may assume that every element of the array will be of the same data type—either all numbers or all strings.
//
//Use the merge function you wrote in the previous exercise.

mergeSort([9, 5, 7, 1]);           // [1, 5, 7, 9]
mergeSort([5, 3]);                 // [3, 5]
mergeSort([6, 2, 7, 1, 4]);        // [1, 2, 4, 6, 7]

mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']);
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]);
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]


//Good resource for learning more about merge sort. It includes some pseudocode and a detailed description of how the algorithm works - http://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm


function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  let subArray1 = array.slice(0, array.length / 2);
  let subArray2 = array.slice(array.length / 2);

  subArray1 = mergeSort(subArray1);
  subArray2 = mergeSort(subArray2);

  return merge(subArray1, subArray2);
}

//Discussion
//
//Merge sort is one of the more efficient sorting algorithms. However, because of its efficiency, it can be difficult to understand—not to say that everything that is efficient is hard to understand. Let's break it down step by step.
//
//Our mergeSort function takes the array argument and slices it down the middle into two smaller subarrays. When the length of the array argument is even, the two subarrays will both have the same length. Otherwise, when the length is odd, subArray1 will be one element shorter than subArray2. We do this to break down our sorting procedure into smaller, more manageable steps, but it doesn't actually make a difference whether we put the extra element in the first or the second array.
//
//After splitting the array into two subarrays, we call the mergeSort function recursively, first on one of the subarrays, and then on the next. Each of these two recursive calls sorts the current subarray, breaking it down into smaller and smaller parts by repeating this process until we reach the trivial case of sorting a one-element array—at which point we just return the array as is.
//
//Once we have the subarray results, we merge them back together using our merge function from the previous exercise. With each merge, we take two small subarrays and combine them together to return a larger array that contains all the elements from both subarrays. We repeat this process at each level of recursion until we reach the top level. Finally, we return the merged and sorted array to the caller.
