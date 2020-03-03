import {ipcMain} from "electron";

export default {
    saveFile() {
        ipcMain.on('saveFile', (event, name, data) => {
            saveFile(name, data)
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
