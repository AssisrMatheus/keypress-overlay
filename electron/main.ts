import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { GlobalKeyboardListener } from 'node-global-key-listener';

// import menuTemplate from './menu';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  // const displays = screen.getAllDisplays();
  // const externalDisplay = displays.find((display) => {
  //   return display.bounds.x !== 0 || display.bounds.y !== 0;
  // });

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js') // use a preload script
    }
  });

  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    const keyboardListener = new GlobalKeyboardListener();

    keyboardListener.addListener((e, down) => {
      mainWindow?.webContents.send('fromMain', JSON.stringify({ e, down }));
    });
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
