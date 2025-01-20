const path = require('path');
const fs = require('fs');
const Emitter = require('events')
 const emitter = new Emitter();

 const {stdin, stdout} = process;

 stdin.setEncoding('utf-8');

 fs.writeFile(path.join(__dirname, 'text.txt'), '', (err)=> {
    if(err) throw err
 })

 stdout.write('type text')

 stdin.on('data', (data)=> {
    fs.appendFile(path.join(__dirname, 'text.txt'), data + '\n', (err) => {

        if (data.trim() === 'exit') {
          stdout.write('\nyou typed in Exit. The process is finished')
           return process.exit()
     }
    })
 })

 process.on('SIGINT', () => {
    console.log('\nyou pressed  Ctrl + C. The process is finished');
    process.exit(); 
  });