// calculateCGPA.js

const EventEmitter = require('events');
const emitter = new EventEmitter();

const calculateCGPA = (grades) => {
  let totalCredits = 0;
  let totalGradePoints = 0;

  grades.forEach((grade) => {
    totalCredits += grade.creditHours;
    totalGradePoints += grade.gradePoints;
  });

  const cgpa = totalGradePoints / totalCredits;
  emitter.emit('cgpaCalculated', cgpa.toFixed(2));
};

module.exports = { emitter, calculateCGPA };
