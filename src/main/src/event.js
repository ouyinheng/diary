import {ipcMain} from "electron";
const fs = require("fs")
export default {
    saveFile() {
        ipcMain.on('saveFile', (event, name, data) => {
            console.log('i am here')
            // saveFile(name, data)
            fs.writeFile('E:\\game\\input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
                if (err) {
                    return console.error(err);
                }
             });
        });
    },
    min() {
        ipcMain.on('min', e=> mainWindow.minimize());
    },
    max() {
        ipcMain.on('max', e=> {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize()
            } else {
                mainWindow.maximize()
            }
        });
    },
    close() {
        ipcMain.on('close', e=> mainWindow.close());
    }
}
