import electron from 'electron';
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

  if (process.env['ENV'] === 'DEV') mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
