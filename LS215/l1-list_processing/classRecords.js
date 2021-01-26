//get avg score from 4 exams - 65% weighting
//get total score of exercises - 35% weighting
//get perecent grade by adding exam avg and exercises scores acc to weighting
//apply weights to compute final grade percent - round to nearest number
// convert to letter
//combine percent grade and letter grade

//The output class record summary should look like this:

//Round the exam averages to one digit after the decimal point.

//implement a function that takes a studentScores object and returns a class record summary object.

//test code:
let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function generateClassRecordSummary(scores) {
  let returnObj = { studentGrades: [], exams: [] }
  for (let student in scores) {
    let examAvg = scores[student].scores.exams.reduce((acc, cur) => acc + cur) / 4
    let examMin = Math.min(...scores[student].scores.exams)
    let examMax = Math.max(...scores[student].scores.exams)
    let exerciseTotal = scores[student].scores.exercises.reduce((acc, cur) => acc + cur)

    let percentGrade = Math.round((examAvg * .65) + (exerciseTotal * .35))

    let letterGrade = '';
    if (percentGrade >= 93) {
      letterGrade = 'A'
    } else if (percentGrade >= 85) {
      letterGrade = 'B'
    } else if (percentGrade >= 77) {
      letterGrade = 'C'
    } else if (percentGrade >= 69) {
      letterGrade = 'D'
    } else if (percentGrade >= 60) {
      letterGrade = 'E'
    } else {
      letterGrade = 'F'
    }

    returnObj.studentGrades.push(`${percentGrade} (${letterGrade})`)
    let studentExams = { 'average': examAvg, 'minimum': examMin, 'maximum': examMax }
    returnObj.exams.push(studentExams)
  }
  return returnObj
}


console.log(generateClassRecordSummary(studentScores))

//function generateClassRecordSummary(scores) {
//  // ...
//}
//
//generateClassRecordSummary(studentScores);
//
//// returns:
//{
//  studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//  exams: [
//    { average: 75.6, minimum: 50, maximum: 100 },
//    { average: 86.4, minimum: 70, maximum: 100 },
//    { average: 87.6, minimum: 60, maximum: 100 },
//    { average: 91.8, minimum: 80, maximum: 100 },
//  ],
//}
