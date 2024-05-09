const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // File name
    }
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/multer.html");
})
// Initialize multer
const upload = multer({ storage: storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
