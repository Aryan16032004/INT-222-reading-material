const express = require('express');
const app = express();

// Middleware that runs for all requests
app.use((req, res, next) => {
    console.log('This middleware runs for all requests');
    next();
});

// Middleware that runs only for requests to the /admin route
app.use('/admin', (req, res, next) => {
    console.log('This middleware runs for requests to the /admin route');
    next();
});

// Middleware that runs only for POST requests
app.post('*', (req, res, next) => {
    console.log('This middleware runs for all POST requests');
    next();
});

// Route handler for the / route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Route handler for the /admin route
app.get('/admin', (req, res) => {
    res.send('Admin section');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
