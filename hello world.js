const express = require('express');
const path = require('path');  // Required for correct path handling

const app = express();
const port = 3000;

// Set the static directory (where HTML and other static files reside)
app.use(express.static(path.join(__dirname, 'public')));  // Adjust path if needed

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile('index.html'); // Serve the index.html from the static directory
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
