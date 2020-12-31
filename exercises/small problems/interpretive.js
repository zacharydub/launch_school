//#1
//You have a bank of switches before you, numbered from 1 to count. Every switch is connected to exactly one light that is initially off. You walk down the row of switches and toggle every one of them, that is, you flip every switch. All the lights are now on. You walk back to the beginning of the row and start another pass. On this second pass, you toggle switches 2, 4, 6, and so on. Now, every other light is on. On the third pass, you go back to the beginning again, this time toggling switches 3, 6, 9, and so on. You continue to repeat this process until you have made count passes.
// Write a program that takes one argument—the total number of switches—and returns an array of the lights that are on after count passes.

//count iterations and count # of switches
//output:array of lights turned on
//for the nth round, every switch that is a multiple of nth gets toggled.


// function lightsOn(count) {
//   let lights = initializeLights(count);

//   for (let switchNum = 1; switchNum <= count; switchNum += 1) {
//     // rounds: 1..count
//     lights = toggleLights(lights, switchNum);
//   }

//   let result = [];
//   for (let idx = 0; idx < count; idx += 1) {
//     // indices: 0..count-1
//     if (lights[idx]) {
//       result.push(idx + 1);
//     }
//   }

//   return result;
// }

// function initializeLights(count) {
//   let lights = [];

//   for (let switchNum = 0; switchNum < count; switchNum += 1) {
//     lights.push(false);
//   }

//   return lights;
// }

// function toggleLights(lights, round) {
//   return lights.map((light, index) => {
//    return (index + 1) % round === 0 ? !light : light;
//  });
// }


// #2
//Write a function that displays a four-pointed diamond in an nxn grid, where n is an odd integer supplied as an argument to the function
// diamond(1);
// // logs
// // *
// diamond(3);
// // logs
// //  *
// // ***
// //  *
// diamond(9);
// // logs
// //     *
// //    ***
// //   *****
// //  *******
// // *********
// //  *******
// //   *****
// //    ***
// //     *
// //input:odd integer||output:diamonds logged
// //input=middle line of diamond and number of stars in that line, and # of lines. subtract 2 to get # of stars in line above and below, keep subtracting til 1 wich is top and bottom.

// //spaces = each line up/down from middle requires another space before the stars
// //each row has 1,3...n..3..1 stars
// //each row has (n-countStars)/2 spaces

// function diamond(n) {
//   numberSequence(n).forEach(number => {
//     console.log(`${" ".repeat((n - number) / 2)}${"*".repeat(number)}`);
//   });
// }

// function numberSequence(n) {
//   let result = [];
//   let increment = 2;
//   let number = 1;

//   while (number > 0) {
//     result.push(number);
//     if (number === n) {
//       increment = -2;
//     }
//     number += increment;
//   }

//   return result;
// }

//#3
function isBlockWord(word) {
  let blocks = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];
  let letters = word.split("");

  for (let index = 0; index < letters.length; index += 1) {
    let matchingBlock = blocks.filter(block => {
      return block.indexOf(letters[index].toUpperCase()) > -1;
    })[0];

    if (matchingBlock === undefined) {
      return false;
    } else {
      blocks.splice(blocks.indexOf(matchingBlock), 1);
    }
  }

  return true;
}

// 4
function buildStarRow(spacesBetween, spacesPadding) {
  let asterisks = ["*", "*", "*"];
  let starRow = asterisks.join(" ".repeat(spacesBetween));
  let paddedStarRow = " ".repeat(spacesPadding) + starRow;

  return paddedStarRow;
}

function star(size) {
  let middleIdx = Math.floor(size / 2);

  for (let idx = 0; idx < middleIdx; idx += 1) {
    let spacesBetween = (size - 3) / 2 - idx;
    let spacesPadding = idx;
    console.log(buildStarRow(spacesBetween, spacesPadding));
  }

  console.log("*".repeat(size));

  for (let idx = 0; idx < middleIdx; idx += 1) {
    let spacesBetween = idx;
    let spacesPadding = (size - 3) / 2 - idx;
    console.log(buildStarRow(spacesBetween, spacesPadding));
  }
}