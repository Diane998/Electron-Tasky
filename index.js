const path = require('path'),
  electron = require('electron'),
  TimerTray = require('./app/timer_tray');
const { app, BrowserWindow, Tray } = electron;

let mainWindow, tray;

app.once('ready', () => {
  app.dock.hide();
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
  // blur - trigerred when the user isn't focused on the window
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const iconName =
    process.platform === 'win32' || process.platform === 'linux'
      ? 'windows-icon.png'
      : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`); // joins paths depending on the operating system
  tray = new TimerTray(iconPath, mainWindow);
});
