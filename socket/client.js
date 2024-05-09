const net = require('net');

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log('Connected to server.');
    client.write('Hello, server!');
});

client.on('data', (data) => {
    console.log('Received:', data.toString());
    client.end();
});

client.on('end', () => {
    console.log('Disconnected from server.');
});
