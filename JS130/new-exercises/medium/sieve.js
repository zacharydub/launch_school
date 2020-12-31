const markNumbers = (num, range, limit) => {
    let multiplier = 2;
    let multiple = multiplier * num;

    while (multiple <= limit) {
        let elmIndex = range.indexOf(multiple)
        if (elmIndex !== -1) {
            range[elmIndex] = 0;
        }
        multiplier++;
        multiple = multiplier * num
    }
    return range
}

function primes(limit) {
    let range = [];
    for (let i = 2; i <= limit; i++) {
        range.push(i);
    };

    range.forEach(num => {
        if (num === 0) return; // using return as a 'continue' statement but i thought for each ignores 'return'. ALso if range array starts at 2 when would there be an element equal to 0?

        markNumbers(num, range, limit)
        // let multiplier = 2;
        // let multiple = multiplier * num;

        // while (multiple <= limit) {
        //     let elmIndex = range.indexOf(multiple)
        //     if (elmIndex !== -1) {
        //         range[elmIndex] = 0;
        //     }
        //     multiplier++;
        //     multiple = multiplier * num
        // }
    })
    return range.filter(num => num !== 0);
}

module.exports = primes


// function primes(integer) {
//     let array = Array.from(Array(integer - 1).keys(), x => x + 2);
//     for (let index = 0; index <= array.length; index ++) {
//       let prime = array[index];
//       for (let next = index + prime  ; next < array.length; next += prime ) {
//         array[next] = "NOT PRIME";
//       }
//     }
//     return array.filter(num => {
//       return typeof num === "number";
//     });
//   }
//}