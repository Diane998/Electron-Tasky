const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(options, url) {
    super(options);

    this.loadURL(url);
    this.on('blur', this.onBlur);
  }

  onBlur = () => {
    // blur - trigerred when the user isn't focused on the window
    this.hide();
  };
}

module.exports = MainWindow;
