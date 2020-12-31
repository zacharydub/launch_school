// // #2 *** to review***
// What does the last line in the following code output?
// let object = { first: [1] };
// let numArray = object["first"];
// numArray.push(2);
// console.log(numArray); //  => "[1, 2]"
// console.log(object);
// Since numArray is a reference to the original array, [1], numArray.push(2) modifies this array. Thus, the original object referenced by object is changed. If, instead of modifying the original object, we want to modify numArray but not object, we have two options:
// We can declare and initialize numArray with a reference to a copy of the original array:
// let object = { first: [1] };
// let numArray = object["first"].slice();
// numArray.push(2);
// We can use Array.prototype.concat(), which returns a new array instead of modifying the original array:
// let object = { first: [1] };
// let numArray = object["first"].concat();
// numArray.push(2);

// // #3 ****to review****

// // #4
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  if (dotSeparatedWords.length === 4) {
    while (dotSeparatedWords.length > 0) {
      let word = dotSeparatedWords.pop();
      if (!isAnIpNumber(word)) {
        console.log("Not valid input")
        break;
      }
    }
  } else {
    console.log("Not 4 items")
  }

  return true;
}
function isAnIpNumber(str) {
  if (!/^\d+$/.test(str)) return false;

  let number = Number(str);
  return number >= 0 && number <= 255;
}
isDotSeparatedIpAddress("2.3")
console.log(isDotSeparatedIpAddress('10.4.5.11'))
isDotSeparatedIpAddress("2.3.a.f")
