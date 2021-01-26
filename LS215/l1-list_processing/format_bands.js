//We have the following Array of information for some popular bands:

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

//There are problems with this data, though, so we first have to clean it up before we can use it:
//
//    The band countries are wrong: all the bands should have 'Canada' as the country.
//    The band name should have all words capitalized.
//    Remove all dots from the band names.
//
//Write a function that can process the input band Array and return an Array that contains the fixed information


//algo
//iterate thru input array
//for each element, transform the name and country props
function processBands(array) {
  return array.map(elm => {
    return {
      name: formatName(elm.name),
      country: 'Canada',
      active: elm.active
    }
  })
}
console.log(processBands(bands))

//split into array of words
//iterate over array and transform each element - 1st char capitalized, and remove dots
function formatName(str) {
  let arr = str.split(' ');
  let mapped = arr.map(elm => elm[0].toUpperCase() + elm.slice(1));
  let nodots = removeDots(mapped)
  return nodots.join(" ")
  //for each array element, split it into another array, then iterate thru that aray and filter out dots, then convert array elm back to str
  //return mapped
}

function removeDots(arr) {
  let newarr = [];
  for (let i = 0; i < arr.length; i++) {
    newarr.push(arr[i].split('').filter(elm => elm !== '.').join(''))
  }
  return newarr
}
