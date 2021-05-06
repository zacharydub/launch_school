const array1 = [5, 3];
console.log(bubbleSort(array1));
console.log(array1);    // [3, 5]

const array2 = [6, 2, 7, 1, 4];
console.log(bubbleSort(array2));
console.log(array2);    // [1, 2, 4, 6, 7]

const array3 = ['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie'];
console.log(bubbleSort(array3));
console.log(array3);    // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]å

//rules:
//iterate thru array - comparing 1st element vs 2nd element. if 1st element is greater than 2nd element, then swap locations
//repeat again until no swaps made - can determine with a Boolean. initially set to false, and if a swap is made then set to true

function bubbleSort(arr) {
  let bool = true;
  while (bool) {
    arr.forEach((elm, index) => {
      let current = arr[index];
      let next = arr[index + 1];
      if (current > next) {
        arr[index + 1] = current;
        arr[index] = next;
        bool = false;
      }
    })
    if (!bool) {
      bool = true;
    } else {
      bool = false;
    }
  }
  return arr;
}
