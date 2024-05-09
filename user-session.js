const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.get('/', (req, res) => {
    // Set session data
    req.session.user = { id: 1, username: 'example_user' };
    res.send('Session data set');
});

app.get('/profile', (req, res) => {
    // Get session data
    const user = req.session.user;
    res.send(`Welcome, ${user.username}`);
});

app.get('/logout', (req, res) => {
    // Destroy session data
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return;
        }
        res.send('Logged out');
    });
});
