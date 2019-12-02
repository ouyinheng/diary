import {
    app,
    BrowserWindow,
    ipcMain
  } from 'electron'
  const path = require('path')
  import './src/picture';
  // 指定flash路径, 假设与main.js同一目录.
  let pluginName= 'pepflashplayer.dll';
  app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
  /**
   * Set `__static` path to static files in production
   * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
   */
  if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  }
  
  let mainWindow
  const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`
  
  function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      height: 563,
      useContentSize: true,
      width: 1000,
      frame: false,
      webPreferences: {
        plugins: true,
        webSecurity: false
      }
    })
  
    mainWindow.loadURL(winURL)
  
    mainWindow.on('closed', () => {
      mainWindow = null
    })
    mainWindow.webContents.openDevTools({
      mode:"bottom"
    })
  }
  app.on('ready', createWindow)
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
  
  ipcMain.on('min', e=> mainWindow.minimize());
  ipcMain.on('max', e=> {
      if (mainWindow.isMaximized()) {
          mainWindow.unmaximize()
      } else {
          mainWindow.maximize()
      }
  });
  ipcMain.on('close', e=> mainWindow.close());
  ipcMain.on('saveFile', (event, name, data) => {
      saveFile(name, data)
  })