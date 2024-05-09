const connect = require('connect');
const compression = require('compression');

const app = connect();

// Use compression middleware
app.use(compression());

// Your middleware and route handlers
app.use((req, res) => {
    res.end('Hello, world!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
