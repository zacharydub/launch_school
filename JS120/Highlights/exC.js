//execution context

//= environment in which a func executes, AKA value of 'this'. Determined based on how a func is invoked. Default is to be implicitly set, and can also be explicitly set. Methods' implicit context is the object used to call the method, and arrow funcs' implicit context is their surrounding scope. Func declarations' implicit context is the global object. Finally, object created by constructor func + new keyword gets implict context as the newly created object. Separately, can set context explicitly via call,apply, and bind, where call and apply invoke the caller func while bind returns a new func permanently bound to the context object
//When you invoke a function with parentheses, JavaScript uses the global object as the implicit context; when you invoke a method, it uses the object that you used to call the method as the implicit context

//Functions within the global scope are in fact methods on the global object
function myFunc() {
    this.some = "hello global prop"
}
console.log(global.some) //undefined since there is no global prop 'some' yet
console.log(myFunc()) //now we have executed the function which refers to 'this' which is bound to global object - so we have defined a global prop named 'some'...this will still log undefined
console.log(global.some) //logs hello

//BASIC FUNCTION - implicit
function greetMe(name) {
    console.log('Hello ' + name);
    // console.log(this); // logs global object
}
greetMe('John')

function setMovie(movie) {
    this.movie = movie;
}
setMovie("Raiders of the Lost Ark");

console.log(global.movie);  // "Raiders of the Lost Ark"
console.log(movie);         // "Raiders of the Lost Ark"


//BASIC OBJECT - implicit
let person = {
    firstName: 'Rick ',
    lastName: 'Sanchez',
    fullName: this.firstName + this.lastName,
};
console.log('exC gone wrong: ' + person.fullName)

////Anywhere outside a function/method, the keyword this is bound to the global object. If the keyword is used inside a function, then its value depends on how the function was invoked. Since window.firstName and window.lastName (if you're using a browser) are not defined, the operation being performed here is undefined + undefined which results in NaN.

//OBJECT METHOD - implicit - context set to calling object
let obj = {
    name: 'zach',
    greet() {
        console.log('Hello ' + this.name)
    }
}
obj.greet() // 'obj' is the implicit exC for 'method' so 'this' inside of method 'greet' refers to object 'obj' and this expression will log 'hello zach'

function setMovie(movie) {
    this.movie = movie;
}
var theater = {
    loadProjector: setMovie,
};
theater.loadProjector("The Princess Bride");
console.log(theater.movie);   // "The Princess Bride"
console.log(global.movie);    // undefined


//EXPLICIT

//CALL
//function + object
function someFunc(arg) {
    return this.prop + arg
}
let obj1 = { prop: 3 }
obj1.prop = someFunc.call(obj1, 7)
console.log(obj1.prop) //logs 10
//object+method
let obj2 = {
    method() {
        console.log(this.prop)
    }
}
let obj3 = { prop: 5 }
obj2.method.call(obj3) //logs 5
//method+2nd object as context
function setMovie(movie) {
    this.movie = movie;
}
var theater = {
    loadProjector: setMovie,
};
var television = {};
theater.loadProjector.call(television, "Top Gun");
console.log(television.movie);  // "Top Gun"
console.log(theater.movie);     // undefined

//BIND
// a method inherited by all functions from the Function constructor's prototype object.The first argument passed to bind is the context object to which the calling function is permanently bound. bind returns a function whose execution context is permanently bound to that context object. Any further attempts to explicitly set the execution context of that calling function initially used to call bind will be ignored since bind's binding is permanent.
//func+object
function myFunc(arg) {
    return this.prop + arg;
}
let someObj = {
    prop: 7
};
let thing = myFunc.bind(someObj);
console.log(thing(5)); //logs 12
//forEach CB func within method
let bindobj = {
    a: 'hello',
    method1() {
        ['a', 'b', 'c'].forEach(function (letter) {
            console.log(String(letter) + ' ' + this.a)
        }.bind(this))
    }
}
bindobj.method1()
//no changes to exC post-bind
function setMovie(movie) {
    this.movie = movie;
}
var theater = {
    loadProjector: setMovie.bind(theater),
};
var television = {};
theater.loadProjector.call(television, "Top Gun");
console.log(television.movie);  // undefined
console.log(theater.movie);     // "Top Gun"


//CONTEXT LOSS

//METHOD COPIED
//solutions:
//--> either pass context obj as arg or use 'bind'
let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
};
john.greetings(); // context is john - logs 'hello john doe'
let foo = john.greetings; // Strips context.
foo();   // context is now the global object, so logs undesired

let myobj = {
    1: 'zach',
    2: 'dubow',
    method() {
        return this[1] + " " + this[2]
    }
}
let sup = myobj.method   //context loss
console.log('method copied lost context: ', sup())
let sup2 = myobj.method.bind(myobj)
console.log('bound context works now: ', sup2())

//INNER NESTED FUNCTIONS:
//solutions:
// -> outer scope (due to lexical scoping - rule that a variable defined in an outer scope is available to an inner scope),
// -> call iner func with explcit
// -> bind
// -> arrow - this is lexically bound to its surrounding context, i.e the enclosing function invocation. When defined at the top level, the context of an arrow function is the global object.


// let obj = {
//     a: 'hello',
//     b: 'world',
//     method1: function () {
//         function bar() {
//             console.log(this.a + ' ' + this.b);
//         }
//         bar();
//     },
// };
// obj.method1();

let greeter = {
    a: 'hello',
    b: 'world',
    greet() {
        function sayHello() {
            console.log(this.a + ' ' + this.b);
        }
        sayHello()
        // let some = sayHello.bind(this)
        // some();
    }
};

greeter.greet(); // logs 'undefined undefined'

//FUNCTION PASSED AS ARGUMENT
//solutions:
// -> outer scope variable
// ->bind,
// ->arrow func
// ->thisArg argument
// let obj = {
//     a: 'hello',
//     b: 'world',
//     foo: function () {
//         [1, 2, 3].forEach(function (number) {
//             console.log(String(number) + ' ' + this.a + ' ' + this.b);
//         });
//     },
// };
// obj.foo();

// function repeatThreeTimes(func) {
//     func(); // can't use func.call(john); john is out of scope
//   }
//   function foo() {
//     let john = {
//       firstName: 'John',
//       lastName: 'Doe',
//       greetings: function() {
//         console.log('hello, ' + this.firstName + ' ' + this.lastName);
//       },
//     };
//     repeatThreeTimes(john.greetings); // Strips context
//   }
//   foo(); // => hello, undefined undefined

//   function repeatThreeTimes(func, context) {
//     // func.call(context);
//   }

//   function foo1() {
//     let me = {
//       fNmae: 'zach',
//       lName: 'dubow',
//       greetings: function() {
//         console.log('hello, ' + this.fName + ' ' + this.lName);
//       },
//     };
//     repeatThreeTimes(me.greetings, me);
//   }
//   foo1(); // hello, John Doe
//OR:
//  function repeatThreeTimes(func, context) {
//     func()
//   }
//  repeatThreeTimes(me.greetings.bind(me))

//example of giving a method a different exC from the object where its defined
// let obj1 = {
//   logAnimal(sound) {
//     console.log(`${this.animal} likes to ${sound}`);
//   }
// }

// let obj2 = {
//   animal: "cat"
// }

// obj1.logAnimal.call(obj2,"meow");


//collaborator objects
let house = {

    address: "221 B Baker",
    value: 300000,
    appraisal: function (value) {
        this.value = value;
    }
}

let person = {
    name: "Sherlock",
    home: house,
}

person.home.appraisal(400);

console.log(house);

  //advantage of collaboration: modeling has-a relationship. A person has a home. Or a library has a book. Also lets us modularize the problem into smaller pieces
