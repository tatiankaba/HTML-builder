const path = require('path');
const fs = require('fs');
const Emitter = require('events')
 const emitter = new Emitter();

 const {stdin, stdout} = process;

 fs.readFile(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'}, (err, data)=> {
    if(err) throw err;
    stdout.write(data)
 })