const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/validator.html');
  });

// Validation chain for student data
const validateStudentData = [
  body('name').notEmpty().withMessage('Name is required'),
  body('regNo').notEmpty().withMessage('Registration number is required'),
  body('rollNo').notEmpty().withMessage('Roll number is required'),
  body('mobileNo')
    .notEmpty().withMessage('Mobile number is required')
    .isMobilePhone().withMessage('Invalid mobile number format'),
  body('mailId')
    .notEmpty().withMessage('Mail ID is required')
    .isEmail().withMessage('Invalid email address'),
  handleValidationErrors
];

// Route to handle form submission
app.post('/submit', validateStudentData, (req, res) => {
  res.json({ message: 'Data submitted successfully', data: req.body });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
