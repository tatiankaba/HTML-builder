const path = require('path');
const fs = require('fs');
const Emitter = require('events')
const emitter = new Emitter();

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', chunk => {
    console.log(chunk);
});

