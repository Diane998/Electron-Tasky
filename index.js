const path = require('path'),
  electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

let mainWindow, tray;

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
  tray = new Tray(iconPath);
  tray.on('click', (e, bounds) => {
    const { x, y } = bounds; // click event bounds
    const { height, width } = mainWindow.getBounds(); // WIndow height and width

    console.log(x, y);
    mainWindow.getBounds();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition =
          process.platform === 'win32'
            ? y - height
            : process.platform === 'linux'
            ? y + 30
            : y,
        xPosition =
          process.platform === 'linux' ? x + width * 5.4 : x - width / 2;

      mainWindow.setBounds({
        x: xPosition,
        y: yPosition,
        height,
        width
      });
      mainWindow.show();
    }
  });
});
