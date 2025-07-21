import electron, { ipcMain, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';
import reloader from 'electron-reloader';

const { app, BrowserWindow } = electron;

try {
  reloader(module);
} catch (_) {
  console.log('Failed to load reloader');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const indexPath =
    process.env['ELECTRON_START_URL'] ||
    url.format({
      pathname: path.join(__dirname, '../dist/browser/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.loadURL(indexPath);

  ipcMain.handle('open-external', async (_, url) => {
    await shell.openExternal(url);
  });

  if (process.env['ENV'] === 'DEV') mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
