//Write a function that displays an 8-pointed star in an nxn grid, where n is an odd integer that is supplied as an argument to the function. The smallest such star you need to handle is a 7x7 grid (i.e., when n is 7).
star(7);
//*  *  * row1: astk-> 2 spaces->astk-> 2spaces->astk
// * * *  row2: 1 space->astk-> 1 space->astk->1 space->astk->space
//  ***   row3: 2 spaces->3 astk->spaces
//******* row4: 7 astks
//  ***   row5: same as row 3
// * * *  row6: same as row2
//*  *  * row7 - same as row1
////Math.floor(7/2) = 3 --> 3 rows above and below middle row
//star(9);
//*   *   *   astk-> 3 spaces->astk-> 3 spaces -> astk
// *  *  *    1 spaces -> astk -> 2 spaces
//  * * *     2 spaces -> astk -> 1 spaces
//   ***   3 spaces->astk
//*********
//   ***
//  * * *
// *  *  *
//*   *   *
////Math.floor(9/2) = 4 --> 4 rows above and below middle row

//algo:
//there are n # of rows
//middle row(i.e.Math.ceil(n / 2)) has n # of stars in a row
//above rows mirror below rows
//position of spaces and asterisks:
//1st row starts with astk then Xspaces then astk then Xspaces then astk
//2nd row start with space then astsk then Xspaces then astk then Xspaces then astk then 1 space
//3rd row start with 2 spaces

function star(n) {
  let spaces = Math.floor(n / 2) - 1;
  for (let i = 1; i <= spaces + 1; i++) {
    console.log(`${' '.repeat(i - 1)}*${' '.repeat(spaces)}*${' '.repeat(spaces)}*`)
    spaces--
  }
  console.log(`${' '.repeat(Math.floor(n / 2) - 1)}***${' '.repeat(Math.floor(n / 2) - 1)}`)
  console.log(`${'*'.repeat(n)}`)
  console.log(`${' '.repeat(Math.floor(n / 2) - 1)}***${' '.repeat(Math.floor(n / 2) - 1)}`)

  spaces = Math.floor(n / 2) - 1;
  for (let i = 1; i <= Math.floor(n / 2) - 1; i++) {
    console.log(`${' '.repeat(spaces)}*${' '.repeat(spaces - 1)}*${' '.repeat(spaces - 1)}*${' '.repeat(spaces - 1)}`)
    spaces++
  }

}
