// #1
// name property added to make objects easier to identify
let foo = { name: 'foo' };
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

// qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
// baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
// bar.ancestors();  // returns ['foo', 'Object.prototype']
// console.log(foo.ancestors());  // returns ['Object.prototype']


// #2
// class Person {
//   constructor(firstName, lastName, age, gender) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.gender = gender;
//   }
//   fullName() {
//     return 'fullName'
//   }
//   communicate() {
//     return 'comms'
//   }
//   eat() {
//     return 'eat'
//   }
//   sleep() {
//     return 'sleep'
//   }
// }

// class Doctor extends Person {
//   constructor(firstName, lastName, age, gender, specializaton) {
//     super(firstName, lastName, age, gender);
//     this.specializaton = specializaton;
//   }
//   diagnose() {
//     return 'diagnose'
//   }
// }
// class Professor extends Person {
//   constructor(firstName, lastName, age, gender, subject) {
//     super(firstName, lastName, age, gender);
//     this.subject = subject;
//   }
//   teach() {
//     return 'teach'
//   }
// }
// class Student extends Person {
//   constructor(firstName, lastName, age, gender, degree) {
//     super(firstName, lastName, age, gender);
//     this.degree = degree;
//   }
//   study() {
//     return 'study'
//   }
// }
// class GraduateStudent extends Student {
//   constructor(firstName, lastName, age, gender, degree, graduateDegree) {
//     super(firstName, lastName, age, gender, degree);
//     this.graduateDegree = graduateDegree;
//   }
//   research() {
//     return 'research'
//   }
// }
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}
Person.prototype = {
  fullName() {
    return 'NEWfullname'
  },
  communicate() {
    return 'NEWcomms'
  }
}

// Person.prototype.fullName = function () {
//   return 'fullname'
// }
// Person.prototype.communicate = function () {
//   return 'comms'
// }
Person.prototype.eat = function () {
  return 'eat'
}
Person.prototype.sleep = function () {
  return 'sleep'
}

function Doctor(firstName, lastName, age, gender, specializaton) {
  Person.call(this, firstName, lastName, age, gender)
  this.specializaton = specializaton;
}

Doctor.prototype = Object.create(Person.prototype)
Doctor.prototype.diagnose = function () {
  return 'diagnose'
}
Doctor.prototype.constructor = Doctor;

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = function () {
  console.log('Teaching');
};
Professor.prototype.constructor = Professor;

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender)
  this.degree = degree;
}
Student.prototype = Object.create(Person.prototype)
Student.prototype.study = function () {
  return 'study'
}
Student.prototype.constructor = Student;

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree)
  this.graduateDegree = graduateDegree
}
GraduateStudent.prototype = Object.create(Student.prototype)
GraduateStudent.prototype.research = function () {
  return 'research'
}
GraduateStudent.prototype.constructor = GraduateStudent

let person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
console.log(person.eat());                              // logs 'Eating'
console.log(person.communicate());                      // logs 'Communicating'
console.log(person.sleep());                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
console.log(doctor.eat());                              // logs 'Eating'
console.log(doctor.communicate());                      // logs 'Communicating'
console.log(doctor.sleep());                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
console.log(doctor.diagnose());                         // logs 'Diagnosing'

let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
console.log(graduateStudent.eat());                     // logs 'Eating'
console.log(graduateStudent.communicate());             // logs 'Communicating'
console.log(graduateStudent.sleep());                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
console.log(graduateStudent.study());                   // logs 'Studying'
console.log(graduateStudent.research());                // logs 'Researching'


// #3 - queue

