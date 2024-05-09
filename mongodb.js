const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./usermodel'); // Assuming userModel.js contains the User model definition

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a new user
app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    const user = new User({
        name: name,
        age: age
    });
    const result = await user.save();
    res.json(result);
});

// Read all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Update a user's age
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { age } = req.body;
    const user = await User.findByIdAndUpdate(id, { age: age }, { new: true });
    res.json(user);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
