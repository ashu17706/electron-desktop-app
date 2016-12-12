'use strict';
const electron = require('electron');

const app = electron.app;
const debug = /--debug/.test(process.argv[2]);
const path = require('path');
const glob = require('glob');

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		resizable: true
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	if (debug) {
		win.webContents.openDevTools()
		win.maximize()
		require('devtron').install()
	}

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	loadDemos();
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	loadDemos();
	mainWindow = createMainWindow();
});

// Require each JS file in the main-process dir
function loadDemos () {
  var files = glob.sync(path.join(__dirname, 'main-process/*.js'));
	console.log(files);
  files.forEach(function (file) {
    require(file)
  })
}
