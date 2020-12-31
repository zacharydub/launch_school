function Greeting() { }

Greeting.prototype.greet = function (message) {
  console.log(message);
};

function Hello() { }

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function () {
  this.greet('Hello!');
};

function Goodbye() { }

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function () {
  this.greet("Goodbye");
};

//What happens in each of the following cases? 
//Case 1
let hello = new Hello();
hello.hi(); // 'hello' 
//Case 2
let hello1 = new Hello();
hello.bye();//ndefined --- actually its a type error. I thought Js returns 'undefined' when a prop is not found
//Case 3
let hello2 = new Hello();
hello.greet();//logs nothing --- actually this logs undefined
//Case 4
let hello3 = new Hello();
hello.greet('Goodbye'); // goodbye
//Case 5
Hello.hi(); // undefined -- actually this raises a typeError same as case 2