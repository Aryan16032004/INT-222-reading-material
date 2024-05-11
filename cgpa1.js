// index.js

const ExcelJS = require('exceljs');
const { emitter, calculateCGPA } = require('./cgpa');

// Sample grades
const grades = [
  { subject: 'Mathematics', creditHours: 3, gradePoints: 12 },
  { subject: 'English', creditHours: 2, gradePoints: 8 },
  { subject: 'Science', creditHours: 3, gradePoints: 11 },
];

// Calculate CGPA when event is emitted
emitter.on('cgpaCalculated', (cgpa) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('CGPA');

  worksheet.columns = [
    { header: 'Subject', key: 'subject', width: 20 },
    { header: 'Credit Hours', key: 'creditHours', width: 15 },
    { header: 'Grade Points', key: 'gradePoints', width: 15 },
  ];

  grades.forEach((grade) => {
    worksheet.addRow({ subject: grade.subject, creditHours: grade.creditHours, gradePoints: grade.gradePoints });
  });

  worksheet.addRow({ subject: 'CGPA', creditHours: '', gradePoints: cgpa });

  workbook.xlsx.writeFile('cgpa.xlsx').then(() => {
    console.log('CGPA written to cgpa.xlsx');
  });
});

// Trigger CGPA calculation
calculateCGPA(grades);
