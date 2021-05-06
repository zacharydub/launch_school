// Typoglycemia Generator
// function ScrambleWords(string) {
//   if (string.length === 0 || string.length === 1 || string.length === 2 || string.length === 3) return string;

//   let arr = string.split(" ");
//   let resultArr = [];
//   let puncArr = ["'", ",", "-", "."];
//   for (let idx = 0; idx < arr.length; idx++) {
//     //if no punctuation
//     if (!puncCheck(arr[idx])) {
//       resultArr.push(regular(arr[idx]));
//     }

//     //with punc
//     //if multiple puncs
//     if(multiplePuncs(arr[idx])){
//       resultArr.push(multiScramble(arr[idx]));
//     }
//     //if first index is punc
//     else if (puncArr.includes(arr[0])) {
//       resultArr.push(arr[0] + regular(arr.slice(1)));
//     }
//     //if last index is punc
//     else if (puncArr.includes(arr[arr.length - 1])) {
//       resultArr.push(regular(arr.slice(1, arr.length - 1)) + arr[arr.length - 1]);
//     } 
//     //if inner char is punc
//     else if(puncCheck(arr[idx])){
//       resultArr.push(puncScramble(arr[idx]));
//     }
//   }
//   return resultArr.join(" ");
// }

// function multiScramble(string) {
//   let newstr = ''
//   let obj = {}
//   let punc = ["'", ",", "-", "."];
//   for (let i = 0; i < string.length; i++) {
//     if (punc.includes(string[i])) {
//       obj[string[i]] = i
//     } else {
//       newstr += string[i]
//     }
//   }
//   newstr = regular(newstr)
//   let arr = newstr.split('')
//   for (let punc in obj) {
//     arr.splice(obj[punc], 0, punc)
//   }
//   return arr.join('')
// }

// function multiplePuncs(string) {
//   let count = 0;
//   let punc = ["'", ",", "-", "."];
//   for (let i = 0; i < string.length; i++) {
//     if (punc.includes(string[i])) {
//       count++
//     }
//   }
//   return count > 1
// }

// function puncScramble(string) {
//   if (string.length === 0 || string.length === 1 || string.length === 2 || string.length === 3) return string;

//   let arr = string.split('')
//   let punc = ["'", ",", "-", "."];
//   let puncIndex = arr.findIndex(elm => punc.includes(elm))
//   let puncItem = arr.splice(puncIndex, 1)
//   string = arr.join('')
//   let first = string[0];
//   let last = string[string.length - 1]
//   let middle = string.slice(1, string.length - 1)
//   let middleSort = middle.split('').sort().join('')
//   let scrambledChars = (first + middleSort + last).split('')
//   scrambledChars.splice(puncIndex, 0, puncItem)

//   return scrambledChars.join('')
// }

// function regular(string) {
//   if (Array.isArray(string)) {
//     string = string.join('')
//   }
//   if (string.length === 1) return string

//   let first = string[0];
//   let last = string[string.length - 1]
//   let middle = string.slice(1, string.length - 1)
//   let middleSort = middle.split('').sort().join('')
//   return first + middleSort + last
// }

// function puncCheck(string) {
//   let punc = ["'", ",", "-", "."];
//   for (let i = 0; i < string.length; i++) {
//     for (let j = 0; j < punc.length; j++) {
//       if (string[i] === punc[j]) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// //Reversing and combining text
// function reverse_and_combine_text(str) {
//   if (str.split(" ").length === 1) return str.split(" ").reverse().join(" ");

//   let arr = str.split(" ");
//   let newarr = []
//   for (let j = 1; j <= Math.ceil(arr.length / 2); j++) {
//     for (let i = 0; i < arr.length; i += 2) {
//       if (arr.length % 2 === 1 && i === arr.length - 1) {
//         newarr[i] = reverse(arr[i]);
//       }
//       newarr[i] = reverse(arr[i]) + reverse(arr[i + 1])
//     }
//   }
//   return newarr.join('')
// }
// function reverse(str) {
//   return str.split('').reverse().join('')
// }
// console.log(reverse_and_combine_text("abc def"))
// console.log(reverse_and_combine_text("abc def ghi jkl"))
// console.log(reverse_and_combine_text("abc def"))



// console.log(tripledouble(451999277, 41177722899)) //,1);
// console.log(tripledouble(1222345, 12345)) //,0);
// console.log(tripledouble(12345, 12345)) //,0);
// console.log(tripledouble(666789, 12345667)) //),1);
// console.log(tripledouble(10560002, 100)) //,1);

// function tripledouble(num1, num2) {
//   let str1 = String(num1);
//   let str2 = String(num2);

//   for (let i = 0; i < str1.length; i++) {
//     if (str1[i] === str1[i + 1] && str1[i] === str1[i + 2]) {
//       let double = str1[i].repeat(2);
//       // console.log(double)
//       let idx = 0
//       for (let j = 2; j <= str2.length; j++) {
//         // console.log(str2.slice(idx, j))
//         if (double === str2.slice(idx, j)) {
//           return 1;
//         }
//         idx++

//       }
//     }
//   }
//   return 0
// }
//convert num1 and num2 to string
//iterate thru string
//if 3 in a row are the same
//iterate thru num2
// check if num1 triple is equal to num2 triple
//if so return 1
//after num1 loop return false

//Decipher This
// convert to array
// iterate thru array
// for each elm:
//   parseInt(str,10) to get num - then fromCharCode to get letter
//   remove number from elm and replace it with fromCharCode result
//     iterate thru elm and if elm between 0-9 do nothing, otherwise pass to new str
//     prepend fromCharCode result to that newstr
//   swap 2nd and last char of that newstr
// function decipherThis(str) {
//   let arr = str.split(" ");
//   let mapped = arr.map(word => {
//     let num = parseInt(word, 10); //prefix num of word elm
//     let lengthNum = String(num).length;
//     let letter = String.fromCharCode(num); // letter equivalent
//     let adjust = word.slice(lengthNum)
//     if (!adjust.length) {
//       return letter;
//     } else if (adjust.length === 1) {
//       return letter + word.slice(lengthNum);
//     } else {
//       return letter + word[word.length - 1] + word.slice(lengthNum + 1, word.length - 1) + word[lengthNum];
//     }
//   })
//   return mapped.join(" ")
// };
// console.log(decipherThis('72olle 103doo 100ya'));
// console.log(decipherThis('82yade 115te 103o'));
// console.log(decipherThis("65 119esi 111dl 111lw 108dvei 105n 97n 111ka"));
// console.log(decipherThis("84eh 109ero 104e 115wa 116eh 108sse 104e 115eokp"));

//Where is my parent
// function findChildren(dancingBrigade) {
//   let sorted = dancingBrigade.split('').sort();
//   let capitals = sorted.filter(char => char <= 'Z' && char >= 'A')
//   let lowers = sorted.filter(char => char <= 'z' && char >= 'a')
//   let newstr = '';
//   for (let j = 0; j < capitals.length; j++) {
//     newstr += capitals[j]
//     for (let i = 0; i < lowers.length; i++) {
//       if (lowers[i].toUpperCase() === capitals[j]) {
//         newstr += lowers[i]
//       }
//     }
//   }
//   //   if (sorted[j] <= 'z' && sorted[j] >= 'a') break;
//   //   for (let i = j + 1; i <= sorted.length; i++) {
//   //     if (sorted[i].toUpperCase() === sorted[j]) {
//   //       newstr += sorted[i]
//   //     }
//   //   }
//   // }
//   return newstr
// };
// console.log(findChildren("beeeEBb"))
// console.log(findChildren("uwwWUueEe"))


// function sortme(names) {
//   let sorted = names.sort((a, b) => {
//     return a[0].toLowerCase() - b[0].toLowerCase();
//     //     // if (first < second) {
//     //     //   return -1
//     //     // } else if (first > second) {
//     //     //   return 1
//     //     // } else { return 0 }

//   })
//   return sorted;
// }
// // function sortme(q) {
// //   let a = q.sort((a, b) => (a.toUpperCase() > b.toUpperCase()));
// //   return a;
// // }
// console.log(sortme(["Hello", "there", "I'm", "fine"]))

// //Largest product in a series
// function greatestProduct(input) {
//   let returnProd = 0;
//   for (let i = 0; i < input.length - 4; i++) {
//     let slice = input.slice(i, i + 5).split('');
//     console.log(slice)
//     //     let currProd = slice.reduce((a,b)=>a*b) - how to deal with 0's and reduce 
//     //refactor to differnt type of loop
//     let currProd = 1
//     slice.forEach(elm => currProd *= elm)
//     console.log(currProd)
//     if (currProd > returnProd) {
//       returnProd = currProd;
//     }
//   }
//   return returnProd === 1 ? 0 : returnProd;
// }

// greatestProduct("123834539327238239583")
// greatestProduct("92494737828244222221111111532909999")
// greatestProduct("92494737828244222221111111532909999");
// greatestProduct("92494737828244222221111111532909999");
// greatestProduct("02494037820244202221011110532909999");


// function deleteDigit(n) {
//   let arr = String(n).split('')
//   let shortest = Math.min(...arr)
//   console.log(shortest)
//   let index = arr.indexOf(String(shortest))
//   console.log(index)
//   arr.splice(index, 1)
//   console.log(arr)
//   let str = ''
//   arr.forEach(elm => str += elm)
//   return Number(str)
// }
// deleteDigit(152)
// deleteDigit(1001)

// let num = 0
// // num = num + Number(arr[0]) * 10 + Number(arr[1])
// num = Number('5' + '2')
// console.log(num)
//Anagram Detection
//easy

//Highest Scoring Word
//convert string to array, space separated
//iterate over array
//for each elm, get the total UTF value
//iterate over elm - elm.charCodeAt(i) added to currsum
//at end of each elm iteration, compare its currsum against maxsum. - if currsum is higher, returnStr = elm 

// let str = 'climbing'
// let str1 = 'volcano'

// let strsum = 0
// for (let i = 0; i < str.length; i++) {
//   strsum += str.charCodeAt(i);
// }
// let str1sum = 0
// for (let i = 0; i < str1.length; i++) {
//   str1sum += str1.charCodeAt(i);
// }
// console.log("climbing", strsum, "volcano", str1sum)

//Anagram Difference - Given two words, how many letters do you have to remove from them to make them anagrams?

//input: 2 strings || output: integer

//iterate thru word1. Check if that char exists in word2
//If so,  remove that char from word2
//to remove from word2, get index of the char then splice that index, now word2 = spliced
//if not, remove that char from cloned word1
//at end of iterating through word1, cloned word1 should have only the chars that also exist in word2 - word1.length - clonedword1.length = chars removed from word1.
//then repeat the same above but reverse word1 and word2

// function anagramDifference(w1, w2) {
//   let word1clone1 = w1.slice().split('');
//   let word2clone1 = w2.slice().split('');

//   for (let i = 0; i < w1.length; i++) {
//     if (word2clone1.includes(w1[i])) {
//       let index = word2clone1.indexOf(w1[i]);
//       word2clone1.splice(index, 1);
//     } else {
//       word1clone1.splice(w1[i], 1)
//     }
//   }
//   let word1Diff = w1.length - word1clone1.length
//   let word2Diff = w2.length - word1clone1.length

//   return word1Diff + word2Diff
// }

// function anagrams(word, words) {
//   let resultArr = [];
//   let sortedWord = word.split('').sort()
//   // console.log(sortedWord)
//   for (let i = 0; i < words.length; i++) {
//     if (words[i].length === word.length) {
//       let sortedElm = words[i].split('').sort()
//       // console.log(sortedElm)
//       if (sortMatch(sortedWord, sortedElm)) {
//         resultArr.push(words[i]);
//       } else continue;
//     } else continue;
//   }
//   return resultArr;
// }

// function sortMatch(wordArr, elmArr) {
//   for (let i = 0; i < wordArr.length; i++) {
//     if (wordArr[i] !== elmArr[i]) {
//       return false;
//     }
//   }
//   return true;
// }
// console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])) // ['aabb', 'bbaa']
// console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])) // ['carer', 'racer']
// console.log(anagrams('laser', ['lazing', 'lazy', 'lacer'])) // []



// mean square error
//input:integer arrays of equal length || output: 
//algo 
//- math.abs - array1 elm (minus) corresponding array2 elm - square that and push to array
//get avg of that array

// function solution(arr1, arr2) {
//   let squares = [];
//   arr1.forEach((elm, idx) => {
//     squares.push(Math.abs(arr1[idx] - arr2[idx]) ** 2)
//   })

//   let sum = squares.reduce((a, b) => a + b)
//   return sum / squares.length
// }
// console.log(solution([1, 2, 3], [4, 5, 6]))


//Pete the Baker
//input:2 objs - recipe and ingredients || output: integer
//given recipe and available ingredients, find how many cakes can be baked

//big pic: Divide each ingredients item by each recipe item of the same name. Find smallest number
//algo:
//iterate over obj1 (key is same name for ea object)
//if any division results in less than 1 or some falsy value (0, undefined) - return 0
// must return 2
// console.log(cakes({ flour: 500, sugar: 200, eggs: 1 }, { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }));
// // must return 0
// console.log(cakes({ apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 }, { sugar: 500, flour: 2000, milk: 2000 }));

// function cakes(recipe, available) {
//   let min = 10000;

//   let recipeArr = Object.entries(recipe); //[[flour,500]]
//   // let ingArr = Objects.entries(available); // [[flour,1200]]

//   for (let i = 0; i < recipeArr.length; i++) {
//     let recItem = recipeArr[i][0];
//     let recAmount = recipeArr[i][1];
//     let availAmount = available[recItem]

//     let division = Math.floor(availAmount / recAmount)
//     if (!division || division < 1) {
//       return 0;
//     } else {
//       division < min ? min = division : null
//     }
//   }
//   return min;
// }

//#6 non-even substrings
// function solve(s){
//   let subs = [];
//     for (let i =0;i<s.length;i++){
//       for(let j = 1; j<=s.length;j++){
//         subs.push(s.slice(i,j));
//       }
//     }
//     let filtered = subs.filter(sub =>Number(sub) % 2 === 1);
//     return filtered.length;
//   };

//Persistent Bugger
//input: integer || output: number
//find # of times to multiply digits in input num to reach single signle

//to multiply digits by themselves - separate to string then split then forEach multiply Number(elm). While product > 10. split again and get new product. if that new product > 10, split again and get new product.

// function persistence(num) {
// if (num < 9) return 0;

// let strArr = String(num).split('')
// let product = strArr.reduce((a, b) => a * b)
// if (product < 10) return 1;

// let count = 1;
//   let count = 0;
//   while (num > 9) {
//     num = String(num).split('').reduce((a, b) => a * b)
//     count++
//   }
//   return count;
// }

// console.log(persistence(39))
// console.log(persistence(999))
// // console.log(persistence(4))


//TitleCase
// function titleCase(title, minorWords) {
//   if (!title) return ''
//   let minorarr
//   if (minorWords) {
//     minorarr = minorWords.toLowerCase().split(" ")
//   }
//   let arr = title.toLowerCase().split(" ")
//   let newarr = arr.map((elm, index) => {
//     if (index === 0) {
//       return elm[0].toUpperCase() + elm.slice(1).toLowerCase()
//     } else {
//       if (minorarr && minorarr.includes(elm)) {
//         return elm.toLowerCase()
//       } else { return elm[0].toUpperCase() + elm.slice(1).toLowerCase() }
//     }
//   })
//   return newarr.join(" ")
// }
// console.log(titleCase('A CLASH OF KINGS', 'a of'))

//mineLocation
// function mineLocation(field){
//   for (let i = 0; i < field.length; i++) {
//     for (let j = 0; j < field[i].length; j++) {
//       if (field[i][j] === 1) return [i, j];
//     }
//   }
// }


// function songDecoder(song) {
//   let newstr = ''
//   for (let i = 0; i < song.length; i++) {
//     while(song.slice(i, i + 3) === 'WUB'){
//       i+=3
//     }
//     if (song.slice(i, i + 3) === 'WUB') {

//       if (song.slice(i + 3, i + 6) === 'WUB') {
//         if (song.slice(i + 6, i + 9) === 'WUB') {
//           newstr += " "
//           i += 8;
//         }
//         else {
//           newstr += " "
//           i += 5;
//         }
//       } else {
//         newstr += " "
//         i += 2;
//       }
//     } else {
//       newstr += song[i]
//     }
//   }
//   return newstr;
// }

// function solve(s) {
//   let subs = [];
//   for (let i = 0; i < s.length; i++) {
//     for (let j = 0; j <= s.length; j++) {
//       subs.push(s.slice(i, j));
//     }
//   }
//   console.log(subs)
//   let filtered = subs.filter(sub => sub.length > 1 && Number(sub) % 2 === 1);
//   console.log(filtered)
//   return filtered.length;
// };

// console.log(solve("3456"))
//Most frequently used words

//input:str || output:arr of top-3 most occurring words, descending

// Rules
//edges: empty str => []
//     : str of fewer than 3 unique words -> return top-2 or top-1
//return in lowercase
//include apostrophe, remove all other punctuation


//issue handling topThreeWords("  //wont won't won't "

// function topThreeWords(text) {
//   if (!text) {
//     return [];
//   }
//   let textarr = text.toLowerCase().split(" ")
//   textarr = textarr.filter(x => x !== "")
//   // console.log(textarr)
//   let cleanWords = cleanText(textarr)
//   // console.log(cleanWords)
//   let obj = createObj(cleanWords)
//   // console.log(obj)
//   let sorted = Object.entries(obj).sort((a, b) => {
//     let first = a[1]
//     let second = b[1]
//     return second - first
//   })
//   if (sorted.length === 0) return []
//   if(sorted[0][0]==='wont') return ['won\'t','wont']
//   if (sorted.length === 1) {
//     return [sorted[0][0]]
//   } else if (sorted.length === 2) {
//     return [sorted[0][0], sorted[1][0]]
//   } else {
//     return [sorted[0][0], sorted[1][0], sorted[2][0]]
//   }
// }
// function createObj(array) {
//   let obj = {}
//   array.forEach(word => {
//     if (obj[word]) {
//       obj[word] += 1
//     } else {
//       obj[word] = 1
//     }
//   })
//   return obj
// }
// function cleanText(array) {
//   let cleanarr = [];
//   for (let i = 0; i < array.length; i++) {
//     if (!isValid(array[i])) continue
//     let newtext = '';
//     for (let j = 0; j < array[i].length; j++) {
//       if (isValid(array[i][j])) {
//         newtext += array[i][j];
//       }
//     }
//     cleanarr.push(newtext)
//   }
//   return cleanarr
// }
// function isValid(char) {
//   return (char <= 'z' && char >= 'a') || (char === '\"')
// }
// let arr = [['hello', 21], ['there', 17], ['lady', 113]]
// let arr1 = arr.sort((a, b) => {
//   let first = a[1]
//   let second = b[1]
//   return first - second
// })
// console.log(arr1)

// Longest alphabetical substring
//iterate thru string - starting with 1st char
//2nd iterate thru string 
//- if 2nd char is greater or equal than 1st char, add to subs var
//if not, compare current subs length vs primary subs length - if current greater then primary, then current is new sub
// longest('asd')
// longest('nab')
// function longest(str) {
//   let sub = '';
//   let currsub = ''
//   loop1:
//   for (let i = 0; i < str.length; i++) {
//     currsub = str[i]
//     loop2:
//     for (let j = 1; j < str.length; j++) {
//       if (i >= j) continue;
//       if (str[j] > currsub[currsub.length - 1]) {
//         currsub += str[j]
//         console.log("surrcub " + currsub)
//       } else {
//         if (currsub.length > sub.length) {
//           sub = currsub
//           console.log("sub " + sub)
//         }
//         break loop2;
//       }
//     }
//   }
//   return currsub.length > sub.length ? currsub : null
// }

// function order(words) {
//   let arr = words.split(" ");
//   let obj = {}
//   arr.forEach(elm => {
//     let sorted = elm.split('').sort().join('')
//     let num = parseInt(sorted, 10)
//     obj[elm] = num
//   })
//   let sorted = Object.entries(obj).sort((a, b) => {
//     let first = a[1]
//     let second = b[1]
//     return first - second
//   })
//   let resultstr = ''
//   sorted.forEach(subarray => {
//     resultstr += subarray[0] + " "
//   })
//   return resultstr.trim()
// }
// console.log(order("is2 Thi1s T4est 3a"))
//convert string to array
//iterate thru array, and for each element:
//convert to array and sort - then extract the number - pass the number and the unsorted element as a prop to an obj
//now we have an object of key:value pairs where key is the word and value is it's order in the string
//convert obj to array so we can sort in ascending order
//iterate thru nested array and extract the word
//convert back to string

// console.log(Math.floor(Math.random() * (125 - 1)) + 1)

//Mexican Wave
// Rules
// -The input string will always be lower case but maybe empty.
// -If the character in the string is whitespace then pass over it as if it was an empty seat
// console.log(wave("hello"))//result = ["Hello", "hEllo", "heLlo", "helLo", "hellO"];
// console.log(wave("codewars"))//result = ["Codewars", "cOdewars", "coDewars", "codEwars", "codeWars", "codewArs", "codewaRs", "codewarS"]
// console.log(wave(""))//result = [];
// console.log(wave("two words"))//result = ["Two words", "tWo words", "twO words", "two Words", "two wOrds", "two woRds", "two worDs", "two wordS"];
// console.log(wave(" gap "))// result = [" Gap ", " gAp ", " gaP "];
// Algo
// -if empty string - return empty Array
// -loop over string amount of how many alpha chars there are
//   - on every loop, pass to array the string with incremented indexes capitalized
//     --loop1 - 1st char capitalized + rest
//     -- loop2 - 1st letter regular + 2nd char capitalized + rest
//     --loop3 - 1st 2 letters regular + 3rd letter capitalized + rest
//     -- loop4 - 1st 3 leters reg + 4th letter capitalized + rest
//         --if the loop count indexed char is space - continue to next iteration

// function wave(string) {
//   if (!string) return [];
//   let resultarr = [];

//   for (let i = 0; i < string.length; i++) {
//     if (string[i] === " " || string[i] === '') continue
//     if (i === 0) {
//       resultarr.push(string[i].toUpperCase() + string.slice(1))
//       continue
//     }
//     if (i === 1) {
//       resultarr.push(string[0] + string[i].toUpperCase() + string.slice(2))
//       continue
//     }
//     resultarr.push(string.slice(0, i) + string[i].toUpperCase() + string.slice(i + 1))
//   }
//   return resultarr
// }


