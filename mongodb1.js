const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);
const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});

newUser.save().then(() => {
    console.log('User created successfully');
}).catch((err) => {
    console.error('Error creating user:', err);
});
