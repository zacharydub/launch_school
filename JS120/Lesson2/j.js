let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    [1, 2, 3].forEach(function (number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }.bind(this));
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world