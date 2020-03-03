import { app, BrowserWindow, ipcMain} from 'electron'
const path = require('path');
import myTray from './src/tray'
let pluginName= 'pepflashplayer.dll';
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;
let trayIcon = path.join(__dirname, 'app');
function createWindow() {
	mainWindow = new BrowserWindow({
		height: 663,
		useContentSize: true,
		width: 1300,
		frame: false,
		webPreferences: {
			plugins: true,
			webSecurity: false
		}
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () => {
		mainWindow = null
	});
	mainWindow.webContents.openDevTools({
		mode:"bottom"
	});
	myTray.setTray(mainWindow, trayIcon);
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
});

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
	fs.writeFile(`./${name}.html`, data, res => {
		console.log('写入成功')
	})
});

// const win = new BrowserWindow()

// win.setProgressBar(0.5)
