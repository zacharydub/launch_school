// #1

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function (timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}
let helloVictor = createGreeter('Victor');
helloVictor.greet('evening');
// = Good Morning Victor

// #2
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function (percent) {
    let discount = this.price * percent / 100;
    let newPrice = this.price - discount;
    return newPrice
  },
};
console.log(item.discount(20))   // should return 40
//40
console.log(item.discount(50))   // should return 25
//20
console.log(item.discount(25)) // should return 37.5
//15

//#3
console.log(objectsEqual({ a: 'foo' }, { a: 'foo' }));                      // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' }));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 }));  // false

function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}

// #4
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student.`)
    },
    addCourse(obj) {
      this.courses.push(obj)
    },
    listCourses() {
      console.log(this.courses)
      // this.courses.forEach(course => console.log(course))
    },
    addNote(courseNum, addnote) {
      let current = this.courses.find(course => course.code === courseNum);
      if (current) {
        if (!(current.note)) {
          current.note = addnote;
        } else {
          current.note += "; " + addnote;
        }
      }
    },
    updateNote(courseNum, newNote) {
      let current = this.courses.find(course => course.code === courseNum);
      if (current) {
        current.note = newNote;
      }
    },
    viewNotes() {
      let filtered = this.courses.filter(course => course.note)
      filtered.forEach(course => console.log(course.name + ': ' + course.note))
    }
  }
}

let foo = createStudent('Foo', '1st');
foo.info();
//"Foo is a 1st year student"
foo.listCourses();
//[];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
//[{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
//"Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
//"Math: Fun course; Remember to study for algebra"
//"Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
//"Math: Fun course"
//"Advanced Math: Difficult subject"

// #5
function createSchool() {
  return {
    students: [],
    addStudent: function (name, year) {
      const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th']
      if (VALID_YEARS.includes(year)) {
        let newStudent = createStudent(name, year);
        this.students.push(newStudent);
        return newStudent;
      }
      else {
        return 'Invalid year'
      }
    },
    enrollStudent: function (studentName, courseName, courseCode) {
      studentName.addCourse({ name: courseName, code: courseCode })
    },
    addGrade: function (studentName, courseName, newGrade) {
      let current = studentName.listCourses().find(course => course.name === courseName)
      if (current) {
        current.grade = newGrade;
      }
    },
    getReportCard: function (studentName) {
      studentName.listCourses().forEach(course => {
        if (course.grade) {
          console.log(course.name + ': ' + course.grade)
        } else {
          console.log(course.name + ': In progress')
        }
      })
    },
    courseReport: function (courseName) {
      function getCourse(newStudent, courseName) {
        return newStudent.listCourses().filter(course => {
          return course.name === courseName
        })[0]
      }
      let courseStudents = this.students.map(student => {
        let course = getCourse(student, courseName) || { grade: undefined }
        return { name: student.name, grade: course.grade }
      }).filter(student => student.grade)

      if (courseStudents.length > 0) {
        console.log(`= ${courseName} Grades=`);
        let average = courseStudents.reduce((total, student) => {
          console.log(`${student.name} : ${String(student.grade)}`);
          return total + student.grade;
        }, 0) / courseStudents.length;
        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }

    },
  }
}
