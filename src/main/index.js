import { app, BrowserWindow, ipcMain} from 'electron'
const path = require('path');
const fs = require("fs")
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
		width: 1200,
		frame: false,
		hasShadow: false,
		transparent: true,
		resizable: false,
		webPreferences: {
			plugins: true,
			webSecurity: false,
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () => {
		mainWindow = null
	});
	// mainWindow.webContents.openDevTools({
	// 	mode:"bottom"
	// });
    myTray.setTray(mainWindow, trayIcon);
    if(fs.existsSync('E:\\diary\\')) {
        // 存在
    } else {
        fs.mkdirSync('E:\\diary');
    }
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

ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e => {
	// if (mainWindow.isMaximized()) {
	// 	mainWindow.unmaximize()
	// } else {
		mainWindow.maximize()
	// }
});
ipcMain.on('unmax', e => mainWindow.unmaximize());
ipcMain.on('close', e => mainWindow.close());
ipcMain.on('saveFile', (event, name="test", data) => {
    console.log('name:saveFile', name)
    if(fs.existsSync('E:\\diary\\')) {
        fs.writeFile('E:\\diary\\' + name, data,  function(err) {
            if (err) {
                return console.error(err);
            }
        });
    } else {
        fs.mkdirSync('E:\\diary');
        fs.writeFile('E:\\diary\\' + name, data,  function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
});

ipcMain.on('getFileData', function(event, url) {
    // arg是从渲染进程返回来的数据
   // 这里是传给渲染进程的数据
    fs.readFile(path.join(__dirname, url),"utf8",(err,data)=>{
        console.log(data)
        if(err){
            event.sender.send('asynchronous-reply', "读取失败");
        }else{
            event.sender.send('asynchronous-reply', data);
        }
        
    })
 });

 ipcMain.on('getFileStreamData', function(event, url) {
    // arg是从渲染进程返回来的数据
   // 这里是传给渲染进程的数据
    const stream = fs.createReadStream(path.join(__dirname, url), {flags: 'r', encoding: 'utf-8'});
    var buf = '';

    stream.on('data', function(d) {
        buf += d.toString(); // when data is read, stash it in a string buffer
        pump(); // then process the buffer
    });

    function pump() {
        var pos;

        while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
            if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
                buf = buf.slice(1); // discard it
                continue; // so that the next iteration will start with data
            }
            processLine(buf.slice(0,pos)); // hand off the line
            buf = buf.slice(pos+1); // and slice the processed data off the buffer
        }
    }

    function processLine(line) { // here's where we do something with a line

        if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)

        if (line.length > 0) { // ignore empty lines
            var obj = JSON.parse(line); // parse the JSON
            console.log(obj); // do something with the data here!
        }
    }
    // fs.readFile(path.join(__dirname, url),"utf8",(err,data)=>{
    //     console.log(data)
    //     if(err){
    //         event.sender.send('asynchronous-reply', "读取失败");
    //     }else{
    //         event.sender.send('asynchronous-reply', data);
    //     }
        
    // })
 });
// const win = new BrowserWindow()

// win.setProgressBar(0.5)
