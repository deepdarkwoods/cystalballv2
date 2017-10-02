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
ipcMain.on('SQLQuery:GetCustomerList', (event) => {
    
  sql.SQLQueryCustomerList(function(result){

      mainWindow.webContents.send('SQLResults:CustomerList', result);

    });

  })


//Request for SQLQuery: Forecast by Customer with ship history
ipcMain.on('mysql:request-forecastbycustomer', (event,customerid,forecasttype) => {

    sql.SQLQueryCustomerForecast(customerid, forecasttype, function(result){

      mainWindow.webContents.send('SQLResults:ForecastByCustomer', result);

  });

})