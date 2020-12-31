function save() {
    console.log('hello')
}
// Call save() every second
var id = setInterval(save, 1000);
// Later, perhaps after the user submits the form
// clearInterval(id);

//#1 - Write a function named startCounting that logs a number to the console every second, starting with 1. Each output number should be one greater than the previous one.

// function startCounting() {
//     let counter = 1
//     console.log(counter)
//     counter++
// }
// let stop = setInterval(startCounting, 1000)
////explain why the above doesnt work
////correct way below:

function startCounting() {
    let count = 0;
    let counterId = setInterval(function () {
        count += 1;
        console.log(count);
    }, 1000);

    return counterId;
}

function stopCounting(counterId) {
    clearInterval(counterId);
}

let goon = startCounting();
// some time later
stopCounting(goon);