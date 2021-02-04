//As we saw in the previous exercises, a matrix can be represented by an array of arrays. For example, the 3x3 matrix shown below:
//
//1  5  8
//4  7  2
//3  9  6
//
//is represented by the following array of arrays:
//
//const matrix = [
//  [1, 5, 8],
//  [4, 7, 2],
//  [3, 9, 6],
//];
//
//A 90-degree rotation of a matrix produces a new matrix in which each side of the matrix is rotated clockwise by 90 degrees. For example, the 90-degree rotation of the matrix shown above is:
//
//3  4  1
//9  7  5
//6  2  8
//
//A 90-degree rotation of a non-square matrix is similar. For example, given the following matrix:
//
//3  4  1
//9  7  5

//its 90-degree rotation is:
//
//9  3
//7  4
//5  1

//Write a function that takes an arbitrary MxN matrix, rotates it clockwise by 90-degrees as described above, and returns the result as a new matrix. The function should not mutate the original matrix.
//
//Examples:

const matrix1 = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
];

const matrix2 = [
  [3, 7, 4, 2],
  [5, 1, 0, 8],
];

const newMatrix1 = rotate90(matrix1);
const newMatrix2 = rotate90(matrix2);
const newMatrix3 = rotate90(rotate90(rotate90(rotate90(matrix2))));

console.log(newMatrix1);      // [[3, 4, 1], [9, 7, 5], [6, 2, 8]]
console.log(newMatrix2);      // [[5, 3], [1, 7], [0, 4], [8, 2]]
console.log(newMatrix3);      // `matrix2` --> [[3, 7, 4, 2], [5, 1, 0, 8]]


function rotate90(matrix) {
  const rotated = [];
  const newRowsCount = matrix[0].length;

  for (let rowIdx = 0; rowIdx < newRowsCount; rowIdx += 1) {
    rotated.push([]);
  }

  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx += 1) {
    for (let colIdx = 0; colIdx < matrix[rowIdx].length; colIdx += 1) {
      rotated[colIdx].push(matrix[rowIdx][colIdx]);
    }
  }

  for (let rowIdx = 0; rowIdx < newRowsCount; rowIdx += 1) {
    rotated[rowIdx].reverse();
  }

  return rotated;
}

//Discussion
//
//Rotating a matrix is similar to transposing a matrix. The main difference is that the elements of each row are arranged in a different order. For example:
//
//Given the matrix: [[1, 5, 8], [4, 7, 2], [3, 9, 6]]
//
//Transposing:
//  - first row of transposed matrix --> [1, 4, 3]
//
//Rotating:
//  - first row has same elements, but in reverse order --> [3, 4, 1]
//
//This solution is almost identical to the one from the previous exercise, with just a minor modification to accommodate the reversing of the rows of the transposed matrix. The solution adds a fourth loop to iterate over each row and reverse it in-place using the Array.prototype.reverse method.
