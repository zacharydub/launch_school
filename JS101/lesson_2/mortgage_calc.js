const readline = require('readline-sync');

//arrows for instructions/prompts/clg/outputs
function prompt(message) {
  console.log(`=> ${message}`);
}
while (true) {
  prompt("Welcome to Mortgage Calculator");
  //test for number input
  function invalidNumber(num) {
    return num.trim() === "" || Number.isNaN(Number(num)) || Number(num) < 0;
  }
  //get loan amount
  prompt("What is your loan amount? (in 000's)");
  let loanAmount = readline.question();
  while (invalidNumber(loanAmount)) {
    prompt("Looking for a positive number here");
    loanAmount = readline.question();
  }
  loanAmount *= 1000;
  //get interest rate
  prompt("What is the interest rate?");
  prompt("(Example: 5 for 5% or 2.5 for 2.5%)");
  let apr = readline.question();
  while (invalidNumber(apr)) {
    prompt("Looking for a positive number here");
    apr = readline.question();
  }
  let monthlyRate = (Number(apr) / 100) / 12;
  //get duration
  prompt("How many years mortage?");
  let years = readline.question();
  while (invalidNumber(years)) {
    prompt("Looking for a positive number here");
    years = readline.question();
  }
  let loanDuration = Number(years) * 12;
  //monthly payment calculation
  let monthlyPayment = loanAmount * ((
    monthlyRate) / (1 - Math.pow((1 + monthlyRate), (-loanDuration))));

  monthlyRate *= 100;
  prompt(`Monthly rate is ${monthlyRate.toFixed(2)}% and loan duration is ${loanDuration} months. Monthly payment is $${monthlyPayment.toFixed(2)}`);
  //go again?
  prompt("Another calculation? [y/n]");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt("Please answer Y/y or N/n");
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y' || answer[0] === 'n') break;
}