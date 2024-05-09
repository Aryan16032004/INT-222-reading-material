const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
// app.use(express.static('public'));

// Middleware function to perform operations on the number
app.post('/calculate', (req, res) => {
  let number = parseInt(req.body.number);
  let increment = number + 1;
  let decrement = number - 1;
  let square = number * number;

  res.send(`
    <h1>Arithmetic Operations</h1>
    <p>Number: ${number}</p>
    <p>Increment: ${increment}</p>
    <p>Decrement: ${decrement}</p>
    <p>Square: ${square}</p>
    <a href="/">Back</a>
  `);
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/calculate.html');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
