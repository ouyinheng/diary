const fs = require('fs');

function eventTest(e, shell) {
    console.log(shell)
 }
function saveFile(e, file) {
    fs.writeFile(file.path, file.data, res => {
        if(res.error) {
            return '存储失败'
        }
    })
}
module.exports ={
    eventTest,
    saveFile
}