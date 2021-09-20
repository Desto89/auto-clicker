const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

let win

function createWindow () {
    win = new BrowserWindow({
      width: 500,
      height: 280,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      resizable: false,
      autoHideMenuBar: true,
    })
  
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('ready', function() {
    globalShortcut.register('L', () => {
        win.webContents.send('send');
    });
});

  app.on('window-all-closed', function () {
    globalShortcut.unregisterAll()
    if (process.platform !== 'darwin') app.quit()
  })