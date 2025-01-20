const fs = require('node:fs');
const path= require('path');


const createBundleFile = function () {
    return new Promise((resolve, reject)=> {

        try {
            fs.writeFile(path.join(__dirname, 'project-dist','styles.css'),'', {recursive: true}, (err)=> {
                if(err) throw err;
            })
            
            resolve();

        } catch(err) {
            console.log("file can't be created");
            return reject();
    }
    }
    )};


const deleteExistedFilesCopy = function () {
    return new Promise((resolve)=> {
            fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, (err) =>{
                if(err) throw err;
                resolve();
            })
    })
}

function copyFiles(ToPath, dest) {
    fs.readdir(ToPath, { encoding: 'utf-8' }, (err, files) => {
        if (err) {
          console.error('mistake when reading file', err);
          return;
        }
         files.forEach((file) => {
            fs.stat(path.join(ToPath, file), (err,stats)=>{
                if (err) throw err;
                if(stats.isFile()) {
                    fs.copyFile(path.join(ToPath, file), path.join(dest, file), (err) => {
                        if(err) throw err;
            
                    })
                }
                if(stats.isDirectory()) {
                    fs.mkdir(path.join(dest, file), (err)=> {
                        if(err) throw err
                    })
                    const newPath = path.join(ToPath, file);
                    const newDest = path.join(dest, file)
                    return copyFiles(newPath, newDest)
                  
                }

          })
        
    });
}
    )};

deleteExistedFilesCopy()
.then(()=> {
    fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, (err)=> {
        if (err) throw err;
    })
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive:true}, (err)=> {
        if (err) throw err;
    })
})
.then(()=>{
    copyFiles(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
})
.then(()=> {
    createBundleFile()
})
.then(()=> {
    fs.readdir(path.join(__dirname, 'styles'), {encoding: 'utf-8'}, (err,data)=> {
        data.forEach((file)=> {
            
            fs.stat(path.join(__dirname, 'styles', `${file}`), (err, stats) => {
                if (err) {
                    console.log('mistake with stats')
                }
                if(stats.isFile() && path.extname(path.join(__dirname, 'styles', `${file}`)) === '.css') {
                    fs.readFile(path.join(__dirname, 'styles', `${file}`), {encoding: 'utf-8'}, (err,data)=> {
                        if(err) throw err;
                        fs.appendFile(path.join(__dirname,  'project-dist', 'styles.css'), data + `\n`, (err)=> {
                            if (err) {
                                console.log('mistake with copying file', err)
                            }
                        })
                    })

                }
            })
        })
    })
})







