// #1
// class Game {
//   play() {
//     return 'Start the game!';
//   }
// }
// class Bingo extends Game {
//   rulesOfPlay() {
//     // rules of play
//   }
// }
// Q - What would happen if we added a play method to the Bingo class, keeping in mind that there is already a method of this name in the Game class from which the Bingo class inherits? Explain your answer. What do we call it when we define a method like this?

//the new method will be the one referenced when called, since JS checks up the prototype chain, starting with the object itself.
//this is called "method overriding" when a class redefines a method that a superclass defines

// #2
// Create a class named Greeting that has a single method named greet. The method should take a string argument, and it should print that argument to the console.
class Greeting {
  greet(str) {
    console.log(str)
  }
}

class Hello extends Greeting() {

  hi() {
    this.greet("Hello")
  }
}
class Goodbye extends Greeting() {
  bye() {
    this.greet("Goodbye")
  }
}

//missed the 'this' - understand why we need it