const MESSAGES = require('./calculator_message.json');
const LANGUAGE = 'en'
// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

function messages(message, lang = 'en') {
  return MESSAGES[lang][message];
}

const readline = require('readline-sync');
function prompt(message) {
  console.log(`=> ${message}`);
}

prompt(messages('welcome', LANGUAGE));

//my code
// let answer = "y"
// while (answer[0].toLowerCase() === 'y') {
while (true) { // theirs
  prompt(messages('1st n', LANGUAGE));
  let number1 = readline.question();
  while (invalidNumber(number1)) {
    prompt(messages('err', LANGUAGE));
    number1 = readline.question();
  }
  //validate user inputted number type
  function invalidNumber(number) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  }

  prompt(messages('2nd n', LANGUAGE));
  let number2 = readline.question();
  while (invalidNumber(number2)) {
    prompt(messages('err', LANGUAGE));
    number2 = readline.question();
  }

  prompt(`${number1}, ${number2}`);
  prompt(messages('op', LANGUAGE));
  let operation = readline.question();
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages('num1-4', LANGUAGE));
    operation = readline.question();
  }
  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  prompt(messages('result', LANGUAGE), `${output}`)
  prompt(messages('another', LANGUAGE), `[y / n]`)
  //my code
  // answer = readline.question();
  let answer = readline.question();//theirs
  if (answer[0].toLowerCase() !== 'y') break;//theirs
}


