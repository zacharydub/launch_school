//Write a function that takes any two version numbers in this format and compares them, with the result of this comparison showing whether the first is less than, equal to, or greater than the second version:

//1
//1.0
//1.2
//3.2.3
//3.0.0
//4.2.3.0

//convert number to string
//iterate thru string
//capture the number before we get to first dot by using parseint(, 10) - note the position where the dot was as the ending/starting point
//compare the 2 numbers. If they are the same, get the number after the first dot and before the next. repeat.
// indexof to get first dot

//If either version number contains characters other than digits and the . character, we should return null

////rules:
//If version1 > version2, we should return 1.
//If version1 < version2, we should return -1.
//If version1 === version2, we should return 0.
//If either version number contains characters other than digits and the . character, we should return null.

//algo
//convert both inputs to strings
//iterate thru strings until we get to 2 different numbers or both are same numbers/we got to end of both strings - stop along the way for the dots
//capture version portions separated by dot

//function compareVersions(str1, str2) {
//  let start = 0;
//  for (let i = 0; i < str1.length; i++) {
//    if (!isNumberOrDot((str1[i])) || !isNumberOrDot((str2[i])))
//      return null;
//    if (str1[i] === '.') {
//      let version1 = parseInt(str1.slice(start, i), 10)
//      let version2 = parseInt(str2.slice(start, i), 10)
//      start = i + 1
//      if (version1 > version2) {
//        return 1
//      } else if (version1 < version2) {
//        return -1
//      }
//    }
//  }
//  version1 = str1
//  version2 = str2
//  if (version1 > version2) {
//    return 1
//  } else if (version1 < version2) {
//    return -1
//  }
//
//  return 0
//}
//function isNumberOrDot(char) {
//  return (char >= 0 && char <= 9) || char === '.'
//}

console.log(compareVersions('1', '1'));            // 0
console.log(compareVersions('1.1', '1.0'));        // 1
console.log(compareVersions('2.3.4', '2.3.5'));    // -1
console.log(compareVersions('1.a', '1'));          // null
console.log(compareVersions('.1', '1'));           // null
console.log(compareVersions('1.', '2'));           // null
console.log(compareVersions('1..0', '2.0'));       // null
console.log(compareVersions('1.0', '1.0.0'));      // 0
console.log(compareVersions('1.0.0', '1.1'));      // -1
console.log(compareVersions('1.0', '1.0.5'));      // -1


//console.log(isNumberOrDot('1'))

function compareVersions(versionA, versionB) {
  let validChars = /^[0-9]+(\.[0-9]+)*$/;

  if (!validChars.test(versionA) || !validChars.test(versionB)) {
    return null;
  }

  let aParts = versionA.split('.').map(Number);
  let bParts = versionB.split('.').map(Number);
  let maxLength = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLength; i += 1) {
    let aValue = aParts[i] || 0;
    let bValue = bParts[i] || 0;

    if (aValue > bValue) {
      return 1;
    } else if (aValue < bValue) {
      return -1;
    }
  }

  return 0;
}
