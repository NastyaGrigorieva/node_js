const fs = require('fs')
const path = require('path');


fs.mkdir(path.join(__dirname,'main','online'),{recursive: true},(err) => {
    if (err){
        console.log(err);
        throw err;
    }
})
fs.mkdir(path.join(__dirname,'main',' inPerson'),{recursive: true},(err) => {
    if (err){
        console.log(err);
        throw err;
    }
})

fs.writeFile(path.join(__dirname,'online', 'onlineUsers.txt'),'SOME_DATA',(err) => {
    if (err){
        console.log(err);
        throw err;
    }
})