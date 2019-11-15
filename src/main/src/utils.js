const fs = require('fs');

export function saveFile(name, data) {
    fs.writeFile('./name.html', data, res => {
        console.log('写入成功')
    })
}