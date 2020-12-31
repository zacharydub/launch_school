https://www.freecodecamp.org/news/lets-learn-javascript-closures-66feb44f6a44/


//example: each call to a function creates a new separate closure
function iCantThinkOfAName(num, obj) {
    // This array variable, along with the 2 parameters passed in, 
    // are 'captured' by the nested function 'doSomething'
    var array = [1, 2, 3];
    function doSomething(i) {
        num += i;
        array.push(num);
        console.log('num: ' + num);
        console.log('array: ' + array);
        console.log('obj.value: ' + obj.value);
    }
    return doSomething;
}
var referenceObject = { value: 10 };
var foo = iCantThinkOfAName(2, referenceObject); // closure #1
var bar = iCantThinkOfAName(6, referenceObject); // closure #2
foo(2);
/*
  num: 4
  array: 1,2,3,4
  obj.value: 10
*/
bar(2);
/*
  num: 8
  array: 1,2,3,8
  obj.value: 10
*/
referenceObject.value++;
foo(4);
/*
  num: 8
  array: 1,2,3,4,8
  obj.value: 11
*/
bar(4);
/*
  num: 12
  array: 1,2,3,8,12
  obj.value: 11
*/
//In this example, we can see that each call to the function iCantThinkOfAName creates a new closure, namely foo and bar. Subsequent invocations to either closure functions updates the closure variables within that closure itself, demonstrating that the variables in each closure continue to be usable by iCantThinkOfAName’s doSomething function long after iCantThinkOfAName returns.


//example: 
function mysteriousCalculator(a, b) {
    var mysteriousVariable = 3;
    return {
        add: function () {
            var result = a + b + mysteriousVariable;
            return toFixedTwoPlaces(result);
        },
        subtract: function () {
            var result = a - b - mysteriousVariable;
            return toFixedTwoPlaces(result);
        }
    }
}
function toFixedTwoPlaces(value) {
    return value.toFixed(2);
}
var myCalculator = mysteriousCalculator(10.01, 2.01);
myCalculator.add() // 15.02
myCalculator.subtract() // 5.00

// Because our add and subtract functions have a reference to the mysteriousCalculator function environment, they’re able to make use of the variables in that environment to calculate the result.


//example: maintain a private reference to a variable in the outer scope
function secretPassword() {
    var password = 'xh38sk';
    return {
        guessPassword: function (guess) {
            if (guess === password) {
                return true;
            } else {
                return false;
            }
        }
    }
}
var passwordGame = secretPassword();
passwordGame.guessPassword('heyisthisit?'); // false
passwordGame.guessPassword('xh38sk'); // true
//this example gives the closure function guessPassword exclusive access to the password variable, while making it impossible to access the password from the outside.


//https://medium.com/@vvkchandra/learn-javascript-closures-through-the-laws-of-karma-49d32d35b3f7
//"A closure is a name given to a feature in the language by which a nested function executed after the execution of the outer function can still access outer function’s scope. For a closure to be observed, we somehow need to have a reference to an inner nested function defined in an outer function. The inner function can still access the scope of outer function even after the outer function has finished executing through the closure mechanism."
function tempSequenceMaker() {
    var current = 0;
    // Inner nested function
    function sequence() {
        current = current + 1;
        return "S" + current;
    }
    return sequence;
}
var getSequenceValue = tempSequenceMaker();// we don't need tempSequenceMaker any more. We will see a better pattern instead of this in the next example.
tempSequenceMaker = null;
getSequenceValue(); // S1
getSequenceValue(); // S2
//No one can accidentally or intentionally mess up the sequence value and there by messing up some other application logic.

//IIFE+CLOSURE
var sequence = (function () {
    // private variables which no one can change
    // except the function declared below.
    var count = 0;
    var prefix = "S";
    // returning a named function expression
    // names show up in debuggers - but it's optional otherwise
    return function innerSequence() {
        count = count + 1;
        return prefix + count;
    };
})();
sequence(); // S1
sequence(); // S2


//IIFE+CLOSURE
// If there are multiple nested functions that get exported at the same time, all those functions share the same:
var sequenceObject = (function () {
    var count = 0;
    var counterBag = {};

    counterBag.increment = function () {
        count = count + 1;
    };
    counterBag.decrement = function () {
        count = count - 1;
    };
    counterBag.getValue = function () {
        return count;
    };
    // bag contains all the function references.
    // Think of an entire family's karmic bag.
    return counterBag;
})();
sequenceObject.getValue(); // 0
sequenceObject.increment();
sequenceObject.increment();
sequenceObject.getValue(); // 2
sequenceObject.decrement();
sequenceObject.getValue(); // 1



let band = "Arms and Sleepers";
function playMusic() {
    console.log(band);
}
function goToConcert() {
    let band = "Nils Frahm";
    playMusic();
}

//band = "Green Day";
goToConcert(); //Arms and Sleepers, but if we put in the Green Day it'll log Green Day, showing that funcs have pointers to the variables, not the values.


function makeCalendar(name) {
    var calendar = {
        owner: name,
        events: [],
    };

    return {
        addEvent: function (event, dateString) {
            var eventInfo = {
                event: event,
                date: new Date(dateString),
            };
            calendar.events.push(eventInfo);
            calendar.events.sort(function (a, b) {
                return a.date - b.date;
            });
        },

        listEvents: function () {
            if (calendar.events.length > 0) {
                console.log(calendar.owner + "'s events are: ");

                calendar.events.forEach(function (eventInfo) {
                    var dateStr = eventInfo.date.toLocaleDateString();
                    var description = dateStr + ": " + eventInfo.event;

                    console.log(description);
                });
            } else {
                console.log(calendar.owner + " has no events.");
            }
        },
    };
}

var babbageCalendar = makeCalendar("Charles Babbage");

babbageCalendar.addEvent("Coffee with Ada.", "8/7/2018");
babbageCalendar.addEvent("Difference Engine presentation.", "8/2/2018");

babbageCalendar.listEvents();
    /*
  Logs:
  Charles Babbage's events are:
  8/2/2018: Difference Engine presentation.
  8/7/2018: Coffee with Ada.
*/



