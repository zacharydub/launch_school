function addNumbers(number1) {
    console.log(number1 + number2);
}

function addNumbersGenerate() {
    var number2 = 10;
    addNumbers(number2);
}

addNumbersGenerate(); // error - numbers2 undefined in addNumbers bc of lexical scoping (non-dynamic scoping)
//lexical or static scoping = the scope and value of a variable is determined from where it is defined. It doesn’t change



function countTheNumber() {
    var arrToStore = [];
    for (var x = 0; x < 9; x++) {
        arrToStore[x] = function () {
            return x;
        };
    }
    return arrToStore;
}

const callInnerFunctions = countTheNumber();
callInnerFunctions[0]() // 9
callInnerFunctions[1]() // 9
//vs:
function callTheNumber() {
    function getAllNumbers(number) {
        return function () {
            return number;
        };
    }
    var arrToStore = [];
    for (var x = 0; x < 9; x++) {
        arrToStore[x] = getAllNumbers(x);
    }
    return arrToStore;
}

const callInnerFunctions = callTheNumber();
console.log(callInnerFunctions[0]()); // 0
console.log(callInnerFunctions[1]()); // 1