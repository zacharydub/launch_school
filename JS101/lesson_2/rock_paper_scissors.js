const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock']; ``
const shortChoice = ['r', 'p', 's', 'l']
function prompt(message) {
  console.log(`=> ${message}`);
}
//first
// while (true) {

//2nd
let answer = 'y';
while (answer === 'y' && answer !== 'n') {
  prompt(`Choose one: ${VALID_CHOICES.join(' * ')}`);
  let choice = readline.question();
  while (!VALID_CHOICES.includes(choice) && !shortChoice.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }
  if (choice === 's') {
    prompt("Did you mean scissors or spock?");
    choice = readline.question();
    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice");
      choice = readline.question();
    }
  }
  //random comp choice
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(choice, computerChoice)

  function displayWinner(choice, computerChoice) {
    switch (choice) {
      case 'l':
        choice = 'lizard'
        break;
      case 'r':
        choice = 'rock'
        break;
      case 'p':
        choice = 'paper'
        break;
      default:
        break;
    }
    prompt(`You selected ${choice} and the AI selected ${computerChoice}.`)
    if (playerWins(choice, computerChoice)) {
      prompt('You win!');
    } else if (choice === computerChoice) {
      prompt("It's a tie!");
    } else {
      prompt("Computer wins!");
    }
  }
  function playerWins(choice, computerChoice) {
    return ((choice === 'rock' || 'r') && computerChoice === 'scissors') ||
      ((choice === 'rock' || 'r') && computerChoice === 'lizard') ||
      ((choice === 'paper' || 'p') && computerChoice === 'rock') ||
      ((choice === 'paper' || 'p') && computerChoice === 'spock') ||
      choice === 'scissors' && computerChoice === 'paper' ||
      choice === 'scissors' && computerChoice === 'lizard' ||
      ((choice === 'lizard' || 'l') && computerChoice === 'paper') ||
      ((choice === 'lizard' || 'l') && computerChoice === 'spock') ||
      choice === 'spock' && computerChoice === 'rock' ||
      choice === 'spock' && computerChoice === 'scissors';
  }
  y

  prompt("Do you want another go? [y/n]");
  //1st-2nd - reassigning var 'answer' next line rather than 1st declaring it here
  answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }
  //first
  // if (answer[0] !== 'y') break;
}