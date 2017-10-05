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

    //open dev-tools on app.start
    mainWindow.webContents.openDevTools();
});



//Request for SQLQuery: List of Customers with Forecast
ipcMain.on('SQLQuery:GetCustomerList', (event) => {
    
  sql.SQLQueryCustomerList(function(result){

      mainWindow.webContents.send('SQLResults:CustomerList', result);

    });

  })


//Request for SQLQuery: Forecast by Customer with ship history
ipcMain.on('SQLQuery:GetCustomerForecast', (event,customerid,forecasttype) => {

    sql.SQLQueryCustomerForecast(customerid, forecasttype, function(result){
    
      mainWindow.webContents.send('SQLResults:Forecast', result);

  });

})



//Request for SQLQuery: List of Skus with Forecast
ipcMain.on('SQLQuery:GetSkuList', (event) => {
  
sql.SQLQuerySkuList(function(result){
    
    mainWindow.webContents.send('SQLResults:SkuList', result);

  });

})


//Request for SQLQuery: List of Skus with Forecast
ipcMain.on('SQLQuery:GetSkuForecast', (event,sku,forecasttype) => {
  
sql.SQLQuerySkuForecast(sku,forecasttype,function(result){
    
    mainWindow.webContents.send('SQLResults:Forecast', result);

  });

})


//Request for SQLQuery: List of Skus with Forecast
ipcMain.on('NewWindow:UploadForecast', (event) => {
  let upload_window = new BrowserWindow();
  
  upload_window.loadURL(url.format({
    pathname: path.join(__dirname, 'upload.html'),
    protocol: 'file:',
    slashes: true
  }))

   //open dev-tools on app.start
   upload_window.webContents.openDevTools();

});
