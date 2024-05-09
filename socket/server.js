const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected.');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        socket.write('Message received.');
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
