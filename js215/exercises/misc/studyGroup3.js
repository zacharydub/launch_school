
// In the game Set, three cards form a set if each of the cards are identical or completely different for each of the four properties. All three cards must:

// Have the same color or different colors.
// Have the same number or different numbers.
// Have the same shades or different shades.
// Have the same shape or different shapes.
// The four properties are:

// Colors: red, purple, green
// Numbers: 1, 2, 3
// Shades: empty, lined, full
// Shapes: squiggle, oval, diamond
// Here, a set is represented by an array containing three cards. Each card is represented by an object of properties and values. Write a function that determines whether three cards constitute a valid set.

// A set cannot have 2/3 cards having the same property. Either all must share that property, or none will share that particular property.


// "Same" properties: color
// "Different" properties: numbers, shading and shapes



// Colors are not all identical, but not all different.

//PEDAC
//P - given input array, check if each elm (obj)'s each prop  has all same or all diff values
//input: array || output: boolean

console.log(set(
  [
    { color: "red", number: 1, shade: "empty", shape: "squiggle" },
    { color: "red", number: 2, shade: "lined", shape: "diamond" },
    { color: "red", number: 3, shade: "full", shape: "oval" }
  ]
)) // true
console.log(set(
  [
    { color: "red", number: 1, shade: "empty", shape: "squiggle" },
    { color: "red", number: 2, shade: "lined", shape: "diamond" },
    { color: "purple", number: 3, shade: "full", shape: "oval" }
  ]
)) // false
//other inputs:
//invalid inputs
//non-array - incl empty argument -> null
//empty array -> false
//array with non-3 elements -> null
//array but elms are not objects -> null
console.log(set('')) // null
console.log(set([])) // false
console.log(set([{}])) // null
console.log(set([{}, 1, 'a'])) //null

// shape: transform an array of objects into an array of values, reduce to a boolean

// algo
// invalid inputs check
//non-array - check typeof input -> null
//empty array - check input length-> false
//array with non-3 elements - - check input length -> null
//array but elms are not objects - list processing (every) to ensure each elm is typeof object -> null

//iterate thru array
//for every element, iterate thru object using for/in OR series of if statements for each prop checking if captured value exists in new object and incrementing
//if new object contains prop, increment. Otherwise create prop
// {red:1} -> after iterating thru input array, the values all need to be either 1 or 3
//if yes, return true. If not return false

function set(arr) {
  if (!Array.isArray(arr)) return null;
  if (arr.length === 0) return false;
  if (arr.length !== 3) return null;
  if (!arr.every(elm => typeof elm === 'object')) return null;

  let valuesObj = {}
  arr.forEach(obj => {
    for (key in obj) {
      valuesObj[obj[key]] ? valuesObj[obj[key]]++ : valuesObj[obj[key]] = 1;
      //if (valuesObj[obj[key]]) {
      //  valuesObj[obj[key]]++;
      //} else {
      //  valuesObj[obj[key]] = 1;
      //}
    }
  })
  let values = Object.values(valuesObj);
  return !values.some(elm => elm === 2)


}
