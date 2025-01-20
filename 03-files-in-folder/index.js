const fs = require('node:fs');
const path= require('path');


const folderPath = path.join(__dirname, 'secret-folder');



fs.readdir(folderPath, {encoding: 'utf-8'}, (err, data)=> {
    if(err) throw err;
    data.forEach((file)=> {
        fs.stat(path.join(__dirname, 'secret-folder', `${file}`), (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            
            if(stats.isFile()) {
                console.log(`${file} - ${path.extname(path.join(__dirname, 'secret-folder', `${file}`)).slice(1)} - ${stats.size}MB`)
            }
          });
    })
})