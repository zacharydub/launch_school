
let readline = require('readline-sync');

// function createPlayer() {
//   return {
//     move: null,
//   };
// }

function CreatePlayer() {
  this.move = null;
}

// CreateComputer.__proto__ = Object.create(CreatePlayer)
CreateComputer.prototype.choose = function () {
  const choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
}
function CreateComputer() {
  // let playerObject = new CreatePlayer();
  CreatePlayer.call(this)
  // };

  // return Object.assign(playerObject, computerObject);
}
// CreateHuman.__proto__ = Object.create(CreatePlayer)

CreateHuman.prototype.choose = function () {
  let choice;
  while (true) {
    console.log('Please choose rock, paper, or scissors:');
    choice = readline.question();
    if (['rock', 'paper', 'scissors'].includes(choice)) break;
    console.log('Sorry, invalid choice.');
  }
  this.move = choice;
}
function CreateHuman() {
  CreatePlayer.call(this)
  // let playerObject = new CreatePlayer();
  // let humanObject = {
  // };
  // return Object.assign(playerObject, humanObject);
}
RPSGame.prototype = {
  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
}
//
RPSGame.prototype.constructor = RPSGame;
//why do we need to write this line...we had never set RPSgame's proto to anything else yet

function RPSGame() {
  this.human = new CreateHuman();
  this.computer = new CreateComputer();
};

let game = new RPSGame();
game.play()

//If you later add methods to Player.prototype, you must remember to inherit from it:
CreatePlayer.prototype.doSomething = function () { /* omitted code */ };

Human.prototype = Object.create(CreatePlayer.prototype);
Human.prototype.constructor = Human;
Human.prototype.choose = { /* omitted code */ };

Computer.prototype = Object.create(CreatePlayer.prototype);
Computer.prototype.constructor = Computer;
Computer.prototype.choose = { /* omitted code */ };

const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  Object.assign(Car.prototype, Speed)
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}