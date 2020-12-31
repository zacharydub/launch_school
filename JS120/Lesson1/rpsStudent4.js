//Nicholas Mendez

let readline = require('readline-sync');

let compare = {
  winningPairs: {
    Rock: ['Scissors', 'Lizard'],
    Paper: ['Rock', 'Spock'],
    Scissors: ['Paper', 'Lizard'],
    Lizard: ['Spock', 'Paper'],
    Spock: ['Scissors', 'Rock']
  },

  isHumanWinner(humanMove, computerMove) {
    return this.isWinner(humanMove, computerMove);
  },

  isComputerWinner(computerMove, humanMove) {
    return this.isWinner(computerMove, humanMove);
  },

  isWinner(firstMove, secondMove) {
    return this.winningPairs[firstMove].includes(secondMove);
  },
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  score: createScoreTracker(),

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!');
    console.log(`We are playing first to ${this.score.maxScore()} wins.`);
    console.log('-----------------------------------');
    console.log('Hit Enter to begin.');
    readline.question();
    console.clear();
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors, Lizard, Spock.' +
                ' Goodbye!');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log('');
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (compare.isHumanWinner(humanMove, computerMove)) {
      console.log('You win');
      this.computer.updateLoseArray(computerMove);
    } else if (compare.isComputerWinner(computerMove, humanMove)) {
      console.log('Computer wins!');
    } else {
      console.log('It\'s a tie.');
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    while (!['y','n'].includes(answer.toLowerCase())) {
      console.log('Please enter a valid input. (y/n)');
      answer = readline.question();
    }

    console.clear();
    return answer.toLowerCase() === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      while (this.score.notAtMaxScore()) {
        this.human.choose();
        this.computer.choose();
        this.displayWinner();
        this.score.updateScore(this.human.move, this.computer.move);
        this.score.displayScore();
      }

      if (!this.playAgain()) break;
      this.score.resetScore();
    }

    this.human.displayMoves();
    this.computer.displayMoves();
    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move: null,
    moves: [],

    displayMoves() {
      console.log(`${this.name} Move History: ${this.moves
        .slice(0, this.moves.length - 1)
        .join(', ')
        + ' and '
        + this.moves
          .slice(this.moves.length - 1)
          + '.'
      }`);
    }
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    name: 'Human',

    choose() {
      const CHOICE_OBJ = {
        r: 'Rock',
        p: 'Paper',
        sc: 'Scissors',
        l: 'Lizard',
        sp: 'Spock'
      };
      let choice;

      while (true) {
        this.displayChoices();
        choice = readline.question();
        if (['r', 'p', 'sc', 'l', 'sp'].includes(choice.toLowerCase())) break;
        console.log('Sorry, invalid choice.');
      }

      console.clear();
      this.moves.push(CHOICE_OBJ[choice.toLowerCase()]);
      this.move = CHOICE_OBJ[choice.toLowerCase()];
    },

    displayChoices() {
      console.log('Please choose rock, paper, scissors, lizard, or spock:');
      console.log('Valid input: "r" for Rock, "p" for Paper, "sc" for' +
                  ' Scissors, "l" for Lizard, or "sp" for Spock.');
    }
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    name: 'Computer',
    losingMoves: [],

    choose() {
      const INITIAL_CHOICES = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
      let choices = this.getChoices(INITIAL_CHOICES);
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.moves.push(choices[randomIndex]);
      this.move = choices[randomIndex];

    },

    updateLoseArray(computerChoice) {
      this.losingMoves.push(computerChoice);
    },

    getChoices(choices) {
      let choiceArray = [];
      choices.forEach(choice => {
        let percent = this.getPercentOfLoss(choice);
        if (percent === 0) {
          for (let count = 0; count < 4; count++) choiceArray.push(choice);
        } else if (percent > 0 && percent < 0.25) {
          for (let count = 0; count < 3; count++) choiceArray.push(choice);
        } else if (percent >= 0.25 && percent < 0.50) {
          for (let count = 0; count < 2; count++) choiceArray.push(choice);
        } else {
          choiceArray.push(choice);
        }
      });

      return choiceArray;
    },

    getPercentOfLoss(choice) {
      if (this.losingMoves.length === 0) return 0;
      return this.losingMoves.filter(val => {
        return val === choice;
      }).length / this.losingMoves.length;
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createScoreTracker() {
  return {
    humanScore: 0,
    computerScore: 0,

    maxScore() {
      return 5;
    },

    updateScore(humanMove, computerMove) {
      if (compare.isHumanWinner(humanMove, computerMove)) {
        this.humanScore += 1;
      }  else if (compare.isComputerWinner(computerMove, humanMove)) {
        this.computerScore += 1;
      }
    },

    resetScore() {
      this.humanScore = 0;
      this.computerScore = 0;
    },

    notAtMaxScore() {
      return (this.humanScore < this.maxScore() &&
              this.computerScore < this.maxScore());
    },

    displayScore() {
      console.log('');
      console.log('Score Board');
      console.log('-------------');
      console.log(`   Human: ${this.humanScore}`);
      console.log(`Computer: ${this.computerScore}`);
      console.log('-------------');
      console.log('Press Enter to continue');
      readline.question();
      console.clear();
    },
  };
}

RPSGame.play();