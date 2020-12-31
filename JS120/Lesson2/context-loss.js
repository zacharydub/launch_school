// #1
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
      + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal); // this logs "undefined undefined is a undefined."
}

logReturnVal(turk.getDescription);
//When we pass 'turk.getDescription' (a method) to 'logReturnVal' (a function) as an argument, we remove the method from its context. As a result, when we execute it as 'func', this points to the global object rather than 'turk'. Since 'global 'doesn't have properties defined for 'firstName', 'lastName', or 'occupation', the output isn't what we expect.

//#2
let turk1 = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
      + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk1.getDescription, turk1);
//got it right. 
//Note can also use 'func.apply(context)'. Can also use 'bind', but given the condition that logReturnVal must accept a context argument, that solution leads to this slightly odd code:
// let returnVal = func.bind(context)();
//This code is slightly unclear since it implies that we want the binding to be permanent. Use call or apply instead.


// #3
//extract method getDescription from 'turk' but keep 'turk' as its eC
function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk1.getDescription.bind(turk1))
//got the 2nd part right - notice that we are no longer using context obj  arg passed to 'call' method on the variable initialization

// #4
const TESgames1 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames1.listGames();
//outputs 'undefined' for 'this.seriesTitle' on line 59 - lost context away from the 'TESgames' object when since functions lose their surrounding context when used as arguments to another function (every time it's part of an array method CB) - and contet switches to global object, which doesnt have te property 'seriesTitle' therefore it resolves to 'undefined'

//#5
//using 'let self = this' to ensure that 'TESgames.listGames' uses 'TESGames' as its context and logs the proper output.

const TESgames2 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    let self = this
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames2.listGames();
//got it right

// #6
//Modify the program from the previous problem to use alternative technique provided by 'forEach' to produce the proper output:
const TESgames3 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this)
  }
};
TESgames3.listGames();
//got it right
//used forEach's optional thisArg argument on line 91 -'this' as the 2nd argument after the 1st argument which was the CB

// #7
//using an arrow function to achieve same fix:
const TESgames4 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames4.listGames();
//got it right

//#8
//What will the value of 'foo.a' be after the following code runs?
let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }
    increment();
  }
};
foo.incrementA();
foo.incrementA();
foo.incrementA();
//The value of foo.a will be 0. Since increment gets invoked as a function,  references a property of the global object rather than a property of foo. Thus, the property foo.a isn't modified by the increment; its value remains 0.
// --- analyze this language - should read "this.a on line 5 has as its eC" instead of "references"...see other Qs in blue on Notion - does LS use 'reference' elsewhere instead of 'has as its eC'
// #9
//Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.
let foo1 = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }
    increment();
  }
};
foo1.incrementA.call(foo1)
console.log(foo1.incrementA.call(foo1))
foo1.incrementA.call(foo1); ``
foo1.incrementA.call(foo1);
console.log(foo1.a)
foo1.incrementA.bind(foo1)
foo1.incrementA()
foo1.incrementA()
console.log(foo1.a)
//****to review */
//tryin in the above to increment foo1.a but cant figure it out

//provided solution:
let foo2 = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
  }
};
console.log(foo2.a)
//We can use apply or call to invoke increment on line 8 with explicit context. We pass this as the context argument since inside incrementA but outside of increment, this references the containing object, namely obj.

//I am still seeing 0 in node output????
