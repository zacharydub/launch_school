let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function () {
    // let that = this;
    return [1, 2, 3].map(function (number) {
      return this.name + ' ' + number;
    }, franchise
      // .bind(this)
    );
  },
};

console.log(franchise.allMovies())

// #4
function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function (value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

myFilter([2, 1, 3, 4, 5, 6, 9, 12], function (val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]