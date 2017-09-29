const electron = require('electron');
const {ipcRenderer} = electron;
const $ = require('jquery');





//Return List of Customers who have forecast
//Add drop down box for user to select
ipcRenderer.on('SQLResults:CustomerForecastList',(event,res)=>{

    //Clear old data before appending to div
    $("#selectboxcustomer").remove();
    $("#selectboxforecasttype").remove();

    //create Select box for customers
    let selectCustomer = document.createElement("select");
    selectCustomer.id = "selectboxcustomer";



    //Create Dropdown Menu for list of customer names that have foreast
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
        t1 : 'T1',
        pr : 'PR',
        mf : 'MF'
    };
    
    for(index in typeobject) {
        selectForecastType.options[selectForecastType.options.length] = new Option(typeobject[index], index);
    }

    //create submit button
    let submit = document.createElement("input");
    submit.setAttribute('type', 'submit');
    submit.id = "submitForecastByCustomer"
    submit.onclick = function(){
        console.log('submitted requrest !');
    };

    //append elements to div
    $("#options1").append(selectCustomer);
    $("#options1").append(selectForecastType);
    $("#options1").append(submit);
   
});


