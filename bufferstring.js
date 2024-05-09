// Original string
const originalString = 'Hello, world! ™';

// Create a Buffer from the original string
const buffer = Buffer.from(originalString, 'utf8');

// Encode the buffer using ASCII
const asciiEncodedBuffer = buffer.toString('ascii');

// Decode the ASCII encoded buffer back to the original string
const decodedString = Buffer.from(asciiEncodedBuffer, 'ascii').toString('utf8');

// Log the original string, the ascii encoded string, and the decoded string
console.log('Original string:', originalString);
console.log('ASCII encoded string:', asciiEncodedBuffer);
console.log('Decoded string:', decodedString);
