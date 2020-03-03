import {Menu, Tray} from "electron";
const path = require('path');

export default  {
	// 右键菜单
	setTray(win, trayIcon) {
		let appTary = null;
		var trayMenuTemplate = [{
			label: '设置',
			click: function() {}
		}, {
			label: '退出',
			click: function() {}
		}];
		appTary = new Tray(path.join(trayIcon, 'icon.ico'));
		const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
		appTary.setToolTip('omovie');
		appTary.setContextMenu(contextMenu);
		appTary.on('click', function() {
			win.show();
		})
	}
};
