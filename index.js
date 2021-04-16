const path = require('path'),
  electron = require('electron'),
  TimerTray = require('./app/timer_tray');
const { app, BrowserWindow, Tray } = electron;

let mainWindow;

app.once('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' || process.platform === 'linux'
      ? 'windows-icon.png'
      : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`); // joins paths depending on the operating system
  new TimerTray(iconPath, mainWindow);
});
