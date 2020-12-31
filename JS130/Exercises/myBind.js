// #1
function myBind1(func, ctx) {
    return function () {
        return func.apply(ctx, arguments);
    }
}


function myBind1(func, ctx) {
    return (...args) => {
        return func.apply(ctx, args);
    }
}


//#2

function myBind(func, ctx) {
    let partialArgs = [].slice.apply(arguments, [2])
    return function () {
        let remainingArgs = [].slice.apply(arguments);
        let fullArgs = partialArgs.concat(remainingArgs);
        return func.apply(ctx, fullArgs);
    }
}
function addNumbers(a, b) {
    return a + b;
}

let addFive = myBind(addNumbers, null, 5);
addFive(10) // 15

