// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socket-io-chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define message schema
const messageSchema = new mongoose.Schema({
    text: String
});

const Message = mongoose.model('Message', messageSchema);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// app.use(express.static(__dirname + '/index.html'));
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', async (data) => {
        console.log('Message received:', data);

        // Save the message to MongoDB
        await Message.create({ text: data });

        // Broadcast the message to all connected clients
        io.emit('message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
