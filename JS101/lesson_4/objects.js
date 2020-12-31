let numberOfPets = {
  dogs: 2,
  cats: 4,
  fish: 1
};

let pets = Object.keys(numberOfPets);
let counter = 0;
while (counter < pets.length) {
  let currentPet = pets[counter];
  let currentPetNumber = numberOfPets[currentPet];
  console.log(`I have ${currentPetNumber} ${currentPet}!`);
  counter += 1;
}
// OR
for (let currentPet in numberOfPets) {
  let currentPetNumber = numberOfPets[currentPet];
  console.log(`I have ${currentPetNumber} ${currentPet}!`);
}

// The BREAK statement lets us terminate a loop at any time. The CONTINUE statement provides a similar service, but, instead of terminating the loop, it terminates the current iteration and returns to the top of the loop.

// "guard clause" to exclude the odd numbers from further consideration. A guard clause is a conditional statement that protects the body of a loop or function from having to deal with values it doesn't need to handle.:

// let numbers = [ 1, 4, 3, 7, 6, 5, 2, 1 ];
// for (let index = 0; index < numbers.length; index += 1) {
//   if (numbers[index] % 2 === 1) continue;
//   let square = numbers[index] * numbers[index];
//   console.log(square);}

// In this case, we don't want the main body of our loop (lines 6 and 7) to handle odd numbers, so we use a guard clause at the top of the loop to end the current iteration of the loop and resume with the next. The guard clause also clearly shows that we have no further interest in odd numbers. 
// Guard clauses always include a continue, break, or return statement in the body of the "if", depending on need. Most shouldn't do anything else, but That's not a strict rule.


// select the key-value pairs where the value is 'Fruit'
// let produce = {
//   apple: 'Fruit',
//   carrot: 'Vegetable',
//   pear: 'Fruit',
//   broccoli: 'Vegetable'};
selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }

function selectFruit(produceList, selectionCriterion) {
  let produceKeys = Object.keys(produceList);
  let selectedFruits = {};
  for (let counter = 0; counter < produceKeys.length; counter++) {
    let currentKey = produceKeys[counter];
    let currentValue = produceList[currentKey];
    // if (currentValue === 'Fruit') {
    //   selectedFruits[currentKey] = currentValue;
    // }
    //// used to be (currentValue === 'Fruit')
    if (currentValue === selectionCriterion) {
      selectedItems[currentKey] = currentValue;
    }
  }
  return selectedFruits;
}

//double the odd indices
// function doubleNumsWithOddIndices(numbers) {
//   let doubledNums = [];
//   for (let counter = 0; counter < numbers.length; counter += 1) {
//     let currentNumber = numbers[counter];
//     if (counter % 2 === 1) {
//       doubledNums.push(currentNumber * 2);
//     } else {
//       doubledNums.push(currentNumber);}}
//   return doubledNums;}

// multiply each element by a specified argument
let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]

function multiply(arr, multiplier) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i] * multiplier)
  }
  return newArr
}
console.log(multiply(myNumbers, 4))