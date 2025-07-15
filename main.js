const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;
let splash;

function createWindow() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    icon: path.join(__dirname, 'logo.png'),
    show: true
  });
  splash.loadFile('splash.html');

  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    frame: true, // Change this to true
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'logo.png'),
    show: false
  });

  mainWindow.loadFile('index.html');
  
  // --- Enhanced Auto-Update Logic ---
  autoUpdater.checkForUpdatesAndNotify(); // Automatic check on start

  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update-message', 'Checking for update...');
  });
  autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. Downloading now...'
    });
    mainWindow.webContents.send('update-message', 'Update available. Downloading...');
  });
  autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.send('update-message', 'You are using the latest version.');
  });
  autoUpdater.on('error', (err) => {
    dialog.showErrorBox('Update Error', err == null ? 'unknown' : (err.stack || err).toString());
    mainWindow.webContents.send('update-message', 'Error in auto-updater: ' + err);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow.webContents.send('update-progress', progressObj);
  });
  autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
  });
  // --- End Enhanced Auto-Update Logic ---

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 1200); // Show splash for at least 1.2s
  });

  // Custom DotLabs menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'Reload', role: 'reload' },
        { label: 'Preferences', click: () => mainWindow.webContents.send('open-preferences') },
        { type: 'separator' },
        { label: 'Quit', role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', role: 'undo' },
        { label: 'Redo', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', role: 'cut' },
        { label: 'Copy', role: 'copy' },
        { label: 'Paste', role: 'paste' },
        { label: 'Select All', role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Fullscreen', role: 'togglefullscreen' },
        { label: 'Toggle Developer Tools', role: 'toggleDevTools' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => mainWindow.webContents.send('open-about')
        },
        {
          label: 'Visit Website',
          click: () => shell.openExternal('https://dotlabs.com')
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// IPC handlers for window controls
ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on('window-close', () => mainWindow.close());

app.whenReady().then(createWindow);