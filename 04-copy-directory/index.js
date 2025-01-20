const fs = require('node:fs');
const path= require('path');


const deleteExistedFilesCopy = function () {
    return new Promise((resolve)=> {
            fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, (err) =>{
                if(err) throw err;
                resolve();
            })
    })
}

deleteExistedFilesCopy()
.then(()=> {
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}, (err)=> {
        if (err) throw err;
    })
    
    fs.readdir(path.join(__dirname, 'files'), { encoding: 'utf-8' }, (err, files) => {
        if (err) {
          console.error('Ошибка при чтении директории:', err);
          return;
        }
          files.forEach((file) => {
            fs.copyFile(path.join(__dirname, 'files', `${file}`), path.join(__dirname, 'files-copy', `${file}`), (err) => {
                if(err) throw err;
    
            })
          })
        
    });
})

