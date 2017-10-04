const electron = require('electron');
const {ipcRenderer} = electron;



//*************************************************************************************************

//*************************************************************************************************
//Return List of Customers who have forecast
//Add drop down box for user to select customer and forecast type
ipcRenderer.on('SQLResults:CustomerList',(event,res)=>{

    //Clear old data before appending to div
    var myNode = document.getElementById("options1");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

    //create Select box for customers
    let selectCustomer = document.createElement("select");
    selectCustomer.id = "selectboxcustomer";



    //Create Dropdown Menu for list of customer names that have foreast

    //give user option to select all customers
        let option = document.createElement("option");
        option.text = "All Customers";
        option.value = "all";            
        selectCustomer.append(option);


    //populate list customer names
        for(let i=0;i<res.length;i++)
            {
                let option = document.createElement("option");
                option.text = res[i].customername;
                option.value = res[i].customernumber;            
                selectCustomer.append(option);
            }  

            
    //create select box for forecast type
    let selectForecastType = document.createElement("select");
    selectForecastType.id = "selectboxforecasttype";
    var typeobject = {
        all:'All Forecast Types',
        t1 : 'T1',
        pr : 'PR',
        mf : 'MF'
    };
    
    for(index in typeobject) {
        selectForecastType.options[selectForecastType.options.length] = new Option(typeobject[index], index);
    }

    //create submit button and fire MYSQL request when submitted
    let submit = document.createElement("input");
    submit.setAttribute('type', 'submit');
    submit.id = "submitForecastByCustomer"
    submit.onclick = function(){
        var customerid =  $('#selectboxcustomer').val();
        var forecasttype = $('#selectboxforecasttype').val();

        //send MYSQL request to MAIN process 
        ipcRenderer.send('SQLQuery:GetCustomerForecast',customerid,forecasttype);       
    };

    //append elements to div
    $("#options1").append(selectCustomer);
    $("#options1").append(selectForecastType);
    $("#options1").append(submit);
   
});




//*************************************************************************************************

//*************************************************************************************************
//Return List of Customers who have forecast
//Add drop down box for user to select customer and forecast type
ipcRenderer.on('SQLResults:SkuList',(event,res)=>{
        
    //Clear old data before appending to div
   //Clear old data before appending to div
   var myNode = document.getElementById("options1");
   while (myNode.firstChild) {
       myNode.removeChild(myNode.firstChild);
   }

    //create Select box for customers
    let selectSku = document.createElement("select");
    selectSku.id = "selectboxsku";



    //Create Dropdown Menu for list of customer names that have foreast

    //give user option to select all customers
        let option = document.createElement("option");
        option.text = "All Skus";
        option.value = "all";            
        selectSku.append(option);


    //populate list customer names
        for(let i=0;i<res.length;i++)
            {
                let option = document.createElement("option");
                option.text = res[i].sku + " - "  + res[i].skudescription ;
                option.value = res[i].sku;            
                selectSku.append(option);
            }  

            
    //create select box for forecast type
    let selectForecastType = document.createElement("select");
    selectForecastType.id = "selectboxforecasttype";
    var typeobject = {
        all:'All Forecast Types',
        t1 : 'T1',
        pr : 'PR',
        mf : 'MF'
    };

    for(index in typeobject) {
        selectForecastType.options[selectForecastType.options.length] = new Option(typeobject[index], index);
    }

    //create submit button and fire MYSQL request when submitted
    let submit = document.createElement("input");
    submit.setAttribute('type', 'submit');
    submit.id = "submitForecastBySku"
    submit.onclick = function(){
        var sku =  $('#selectboxsku').val();
        var forecasttype = $('#selectboxforecasttype').val();

        //send MYSQL request to MAIN process 
        ipcRenderer.send('SQLQuery:GetSkuForecast',sku,forecasttype);     
       
    };

    //append elements to div
    $("#options1").append(selectSku);
    $("#options1").append(selectForecastType);
    $("#options1").append(submit);


});



let createDownloadButton = ()=> {

    let button = document.createElement("button");


};