const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the user
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
