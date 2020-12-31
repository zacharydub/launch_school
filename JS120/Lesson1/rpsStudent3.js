//Jrdan Thomas August 28 2020

const readline = require('readline-sync');
const RPSGame = {

  human: createHuman(),
  computer: createComputer(),
  bestOf: null,
  roundResult: null,
  winningCombos: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors'],
  },

  prepGame() {
    this.clearLastRound();
    this.human.resetScore();
    this.computer.resetScore();
    this.bestOf = readline.question("Best of how many rounds?" +
      " (enter an odd integer)\n");
  },

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGameStatus() {
    console.clear();
    console.log(`${" ".repeat(10)}SCORE${" ".repeat(10)}`);
    console.log(`Human: ${this.human.score}${" ".repeat(6)}` +
      `Computer: ${this.computer.score}\n`);
    console.log(`${this.human.move}${" ".repeat(10)}${this.computer.move}`);

    if (this.roundResult !== null) {
      console.log(`\n${this.roundResult}`);
    }
  },

  updateScore() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.winningCombos[humanMove].includes(computerMove)) {
      this.human.score += 1;
      this.computer.history.loseCount[computerMove] += 1;
      this.roundResult = 'You won the round!';
    } else if (humanMove === computerMove) {
      this.roundResult = "It's a tie";
    } else {
      this.computer.score += 1;
      this.computer.history.winCount[computerMove] += 1;
      this.roundResult = 'You lost the round';
    }
  },

  getUserContinue() {
    readline.question("hit enter to continue");
  },

  clearLastRound() {
    this.human.resetMove();
    this.computer.resetMove();
    this.roundResult = null;
  },

  displayGameWinner() {
    if (this.human.score === Math.ceil(this.bestOf / 2)) {
      console.log("You win the game!");
    } else if (this.computer.score === Math.ceil(this.bestOf / 2)) {
      console.log("You lost the game");
    }
  },

  isGameOver() {
    return (
      this.human.score === Math.ceil(this.bestOf / 2) ||
      this.computer.score === Math.ceil(this.bestOf / 2)
    );
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  playAgain() {
    let answer = readline.question("Would you like to play again? (y/n)");
    return answer.toLowerCase()[0] === 'y';
  },

  playRound() {
    this.clearLastRound();
    this.displayGameStatus();
    this.human.choose();
    this.computer.choose();
  },

  // main procedure
  play() {

    while (true) {
      this.displayWelcomeMessage();
      this.prepGame();

      while (true) {
        this.playRound();
        this.updateScore();
        this.displayGameStatus();
        this.computer.history.updateProbabilities();

        if (this.isGameOver()) break;
        this.getUserContinue();
      }
      this.displayGameWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};


// FACTORY FUNCTIONS

function createHistory() {
  return {
    winCount: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 },
    loseCount: { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 },
    odds: {
      rock: .2,
      paper: .2,
      scissors: .2,
      lizard: .2,
      spock: .2
    },

    updateProbabilities() {
      /*The probability of the computer choosing a particular move will be
      weighed by the difference between the actual proportion of wins/losses
      earned playing that move and the proportion of wins/losses we expect to
      acheive by playing that move (20% for all moves) if our opponent is
      playing randomly.
      For instance, if 100% of our wins are a result of playing rock and 100%
      of our losses are a result of playing rock, we increase the probability
      of choosing rock by 80% (100% - 20% = +80% or 1.8x) and decrease the
      probability of choosing rock by 80% (20% - 100% = -80% or .2x). The
      resulting probability of the computer choosing rock is 20% because the
      weighted the chance of choosing rock is 20% x 1
      ((1.8 + .2) / 2 = weight of 1).*/

      let totalWins = sum(this.winCount);
      let totalLosses = sum(this.loseCount);

      ['rock', 'paper', 'scissors', 'lizard', 'spock'].forEach(move => {
        this.odds.move = (
          ((((this.winCount[move] / totalWins) - .2) + 1) +
            ((.2 - (this.loseCount[move] / totalLosses)) + 1)) / 2
        );
      });

      function sum(obj) {
        return Object.values(obj).reduce((sum, count) => {
          return sum + count;
        }, 0);
      }
    },
  };
}

function createComputer() {
  return {
    move: " ",
    score: 0,
    history: createHistory(),

    choose() {
      let paperUpperBound = this.history.odds.rock + this.history.odds.paper;
      let scissorsUpperBound = paperUpperBound + this.history.odds.scissors;
      let lizardUpperBound = scissorsUpperBound + this.history.odds.lizard;
      let spockUpperBound = lizardUpperBound + this.history.odds.spock;

      let randomDecimal = Math.random() * spockUpperBound;

      if (randomDecimal <= this.history.odds.rock) {
        this.move = 'rock';
      } else if (randomDecimal <= paperUpperBound) {
        this.move = 'paper';
      } else if (randomDecimal <= scissorsUpperBound) {
        this.move = 'scissors';
      } else if (randomDecimal <= lizardUpperBound) {
        this.move = 'lizard';
      } else if (randomDecimal <= spockUpperBound) {
        this.move = 'spock';
      }
    },

    resetMove() {
      this.move = " ";
    },

    resetScore() {
      this.score = 0;
    },
  };
}

function createHuman() {
  return {
    move: " ",
    score: 0,

    choose() {
      let choice;
      while (true) {
        choice = readline.question("\nPlease choose rock, paper," +
          " scissors, lizard, or spock\n");
        if (['rock', 'paper', 'scissors', 'lizard', 'spock']
          .includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }
      this.move = choice;
    },

    resetMove() {
      this.move = " ";
    },

    resetScore() {
      this.score = 0;
    },
  };
}


// GLOBAL OBJECT/EXECUTION

RPSGame.play();
