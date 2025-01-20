const fs = require('node:fs');
const path= require('path');


const createBundleFile = function () {
    return new Promise((resolve, reject)=> {

        try {
            fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err)=> {
                if(err) throw err;
            })
            
            fs.writeFile(path.join(__dirname, 'project-dist','bundle.css'),'', {recursive: true}, (err)=> {
                if(err) throw err;
            })
            
            resolve();

        } catch(err) {
            console.log("file can't be created");
            return reject();
    }
    }
    )};


createBundleFile()
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
                            fs.appendFile(path.join(__dirname,  'project-dist', 'bundle.css'), data + `\n`, (err)=> {
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

