const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle messages from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/socket.html");
})

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
