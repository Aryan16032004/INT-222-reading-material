const fs = require('fs');
const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // Write the chunk to the output file
        fs.appendFile('output.txt', chunk, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            // Pass the chunk along for further processing
            callback(null, chunk);
        });
    }
});

// Read from input.txt and pipe to the transform stream
fs.createReadStream('aryan.txt').pipe(transformStream);

// Pipe the transform stream to stdout
transformStream.pipe(process.stdout);
