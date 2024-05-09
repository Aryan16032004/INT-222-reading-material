const fs = require('fs');
const { Transform } = require('stream');

// Create a readable stream to read data from input.txt
const readableStream = fs.createReadStream('aryan.txt');

// Create a Transform stream to convert data to uppercase
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const upperCaseChunk = chunk.toString().toUpperCase();
        this.push(upperCaseChunk);
        callback();
    }
});

// Create a writable stream to write the transformed data to output.txt
const writableStream = fs.createWriteStream('output.txt');

// Pipe the readable stream through the transform stream to the writable stream
readableStream.pipe(transformStream).pipe(writableStream);

// Log a message when the transformation is complete
writableStream.on('finish', () => {
    console.log('Transformation complete. Check output.txt for the transformed data.');
});
