const electron = require('electron');
const {ipcRenderer} = electron;





//Return List of Customers who have forecast
//Add drop down box for user to select
ipcRenderer.on('SQLResults:CustomerForecastList',(event,res)=>{
    //Create Dropdown Menu for list of customer names that have foreast
   console.log(res);
    //Add names to DropDown Menu
});



   