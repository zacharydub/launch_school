//Write a function that displays a four-pointed diamond in an nxn grid, where n is an odd integer supplied as an argument to the function. You may assume that the argument will always be an odd integer.
console.log(diamond(1));
//*
console.log(diamond(3));
// *
//***
// *
console.log(diamond(9));
console.log(diamond(11));
console.log(diamond(13));
//    *
//   ***
//  *****
// *******
//*********
// *******
//  *****
//   ***
//    *

//create diamond-shape with n rows
//input:integer || output: display of asterisks in diamond shape

//rules
//input always odd integer
//n / input # of rows
//each successive row increases by 2, up to midway point / row, after which each rows has 2 fewer asterisks
//there are n chars to fill on every row - either its a space or an asterisk

//algo
//handle case of n = 1
//otherwise:
//initialize variable for spaces and asterisks
//  spaces starts at Math.floor(n / 2) and decreases by 1 until it gets to 0 / or until iteration count gets to Math.ceiling(n / 2) - then it increases by 1
//asterisks start at 1 and increase by 2 until Math.ceiling(n / 2), then it decreases by 2

function diamond(n) {
  if (n === 1) return '*'

  let spaces = Math.floor(n / 2);
  let ast = 1;

  for (let i = 1; i <= Math.ceil(n / 2); i++) {
    console.log(`${' '.repeat(spaces)}${'*'.repeat(ast)}${' '.repeat(spaces)}`);
    spaces--;
    ast += 2;
  }

  spaces++;
  ast -= 2;

  for (let i = Math.ceil(n / 2); i > 1; i--) {
    spaces++;
    ast -= 2;
    console.log(`${' '.repeat(spaces)}${'*'.repeat(ast)}${' '.repeat(spaces)}`);
  }
}
