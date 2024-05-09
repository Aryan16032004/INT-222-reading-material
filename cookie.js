const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/cookie.html');
});

app.post('/set-student', (req, res) => {
  const { name, regNo, age } = req.body;
  res.cookie('student', JSON.stringify({ name, regNo, age }));
  res.send('Student information set!');
});

app.get('/show-student', (req, res) => {
  res.json(req.cookies.student ? JSON.parse(req.cookies.student) : {});
});

app.get('/reset-student', (req, res) => {
  res.clearCookie('student');
  res.send('Student information cleared!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
