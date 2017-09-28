const electron = require('electron');
const {app,BrowserWindow,ipcMain } = electron;
const path = require('path');
const url =  require('url');
const sql = require('./SQL.js');


let mainWindow;

app.on('ready',()=>{

    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
});



//Request for SQLQuery: List of Customers with Forecast
ipcMain.on('SQLQuery:GetCustomerForecastList', (event) => {
    
    var res = sql.SQLQueryCustomerList();
    //Send Results to Frontend
    mainWindow.webContents.send('SQLResults:CustomerForecastList', res);

  })