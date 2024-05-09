const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file with the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'file.html'));
});

// Handle the form submission
app.post('/getFile', (req, res) => {
  const fileName = req.body.fileName;
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.send('File not found.');
    } else {
      res.send(data);
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
