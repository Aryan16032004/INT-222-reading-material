const zlib = require('zlib');
const fs = require('fs');

// Data to be compressed
const data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

// Compress the data using gzip
zlib.gzip(data, (err, compressedData) => {
    if (err) {
        console.error('Compression error:', err);
        return;
    }

    console.log('Compressed data:', compressedData.toString('base64'));

    // Decompress the compressed data
    zlib.gunzip(compressedData, (err, decompressedData) => {
        if (err) {
            console.error('Decompression error:', err);
            return;
        }

        console.log('Decompressed data:', decompressedData.toString());
    });
});

// Alternatively, you can compress and decompress data using streams

// Compress data using gzip and write to a file
const writeStream = fs.createWriteStream('compressed.txt.gz');
const gzipStream = zlib.createGzip();

writeStream.on('close', () => {
    console.log('File compressed and written successfully.');
});

gzipStream.pipe(writeStream);
gzipStream.write(data);
gzipStream.end();

// Decompress data from a compressed file
const readStream = fs.createReadStream('compressed.txt.gz');
const gunzipStream = zlib.createGunzip();

let decompressedFileData = '';

readStream.pipe(gunzipStream);

gunzipStream.on('data', (chunk) => {
    decompressedFileData += chunk.toString();
});

gunzipStream.on('end', () => {
    console.log('Decompressed file data:', decompressedFileData);
});
