const fs = require('fs');
const readline = require('readline');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), { flags: 'a' });

const readInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hello! Type text');
console.log('Type "exit" to quit.');

readInterface.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    readInterface.close();  
    process.exit(); 
  } else {
    writeStream.write(input + '\n');
  }
});

writeStream.on('error', (err) => {
  console.error('Error writing to file:', err);
});

readInterface.on('SIGINT', () => {
  console.log('Goodbye');
  readInterface.close();
  process.exit()
});