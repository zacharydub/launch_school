let doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), Professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.diagnose();                         // logs 'Diagnosing'

let professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), Professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

Professional.invoice = function () {
    console.log(this.fullName() + ' is Asking customer to pay');
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'


function delegate(callingObject, methodOwner, methodName) {
    return function () {
        return methodOwner[methodName].apply(callingObject, arguments);
    };
}

function extend(object, mixin) {
    let methodNames = Object.keys(mixin);
    methodNames.forEach(function (name) {
        object[name] = delegate(object, mixin, name);
    });

    return object;
}

let Professional = {
    invoice: function () {
        console.log(this.fullName() + ' is Billing customer');
    },

    payTax: function () {
        console.log(this.fullName() + ' is Paying taxes');
    },
};