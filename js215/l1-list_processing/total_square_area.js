//Write a Function named totalArea that takes an Array of rectangles as an argument. The Function should return the total area covered by all the rectangles.

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141

//iterate thru input array
//for each element, multiply 1st elm by 2nd elm and capture product in new array
//add up elements of new array
function totalArea(array) {
  let mapped = array.map(elm => elm[0] * elm[1])
  return mapped.reduce((acc, cur) => acc + cur)
}

//Now, write a second Function named totalSquareArea. This Function should calculate the total area of a set of rectangles, just like totalArea. However, it should only include squares in its calculations: it should ignore rectangles that aren't square.

let rectangles2 = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalSquareArea(rectangles2));    // 121

function totalSquareArea(array) {
  //let newarr = [];
  //for (let i = 0; i < array.length; i++) {
  //  if (array[i][0] === array[i][1]) {
  //    newarr.push(array[i][0] * array[i][1])
  //  }
  //}
  let filtered = array.filter(rec => rec[0] === rec[1])
  //let mapped = filtered.map(elm => elm[0] * elm[1])
  //return mapped.reduce((sum, area) => sum + area)
  return totalArea(filtered)
}
