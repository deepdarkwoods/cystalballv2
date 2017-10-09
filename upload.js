var app = require('electron').remote; 
var fs = require('fs');
const {dialog} = require('electron').remote;
var Excel = require('exceljs');
const electron = require('electron');
const {ipcRenderer} = electron;



//Choose Excel File to read
function pickFile (){

    //holds array of objects for forecast upload
    let forecast_array = [];


    //open filesystem and find file to upload
    dialog.showOpenDialog((fileNames) => {

        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }

        //Create workbook and read selected file into it
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(fileNames[0])
        .then(function() {            

            //get worksheet in workbook
            let worksheet = workbook.getWorksheet('Sheet1');       

            // Iterate over all rows that have values in a worksheet
            // For each row, create an object and add to the forecast array
            worksheet.eachRow(function(row, rowNumber) {
                
                    var element = {};                           //create element
                    element.customer_number = row.values[1];    //customer number
                    element.customer_name = row.values[2];
                    element.sku = row.values[3];                //sku
                    element.forecast_type = row.values[4];      //forecast type
                    element.m1_forecast = row.values[5];        //month 1 forecast
                    element.m2_forecast = row.values[6];        //month 2 forecast
                    element.m3_forecast = row.values[7];        //month 3 forecast
                    element.m4_forecast = row.values[8];        //month 4 forecast
                    element.m5_forecast = row.values[9];        //month 5 forecast
                    element.m6_forecast = row.values[10];        //month 6 forecast
                    forecast_array.push(element);               //add to array

            });

               
            //delete header row from upload
            forecast_array.shift();

            //Create future 6 month dates
            let monthsNames = calcForecastMonths();


            //create table
            $("#results").tabulator({  
                
                pagination:"local",
                paginationSize:25,     
                selectable:true,
                    columns:[
                                {
                    //create column group
                                    title:"Forecast to Upload By Period (Eaches)",
                                        columns:[
                                            {title:"Customer Number", field:"customer_number", width:130},
                                            {title:"Customer Name",field:"customer_name",width:180},
                                            {title:"Sku", field:"sku", width:100},
                                            {title:"Type", field:"forecast_type", width:100},
                                            {title:monthsNames[0], field:"m1_forecast", formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                                            {title:monthsNames[1], field:"m2_forecast",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                                            {title:monthsNames[2], field:"m3_forecast", formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                                            {title:monthsNames[3], field:"m4_forecast", formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                                            {title:monthsNames[4], field:"m5_forecast", formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                                            {title:monthsNames[5], field:"m6_forecast", formatter:"money",minWidth:60,formatterParams:{precision:"false"}}

                                                ],
                                }
                            ]
            });

            //set data
            $("#results").tabulator("setData", forecast_array);

        });


    });


    //remove 'choose file' button
    $('#pickFile').remove();


    //add upload button
    let uploadButton = document.createElement("button");
    uploadButton.id = "uploadbutton";
    uploadButton.innerText = "Upload File";
    uploadButton.onclick = function(){

        //Send Upoad Request to main process
        ipcRenderer.send('SQLQuery:UploadForecast',forecast_array);
    };
    $('#options1').append(uploadButton);
    
    //add cancel button
    let cancelButton = document.createElement("button");
    cancelButton.id = "cancelbutton";
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = function(){
        location.reload();
    };
    $('#options1').append(cancelButton);



}




//calculate name of months based on current date
function calcForecastMonths()
{
    var date = new Date();
    var months = [
    //calculate FUTURE months headers from current date
    date.getMonth()+1,
    date.getMonth()+2,
    date.getMonth()+3,
    date.getMonth()+4,
    date.getMonth()+5,
    date.getMonth()+6

    ];

    //adjusts the calculated months for end and beginning of year
    var a_months = months.map(element=>{
    
    if(element > 12)
        {return element - 12;}
    else if(element < 1)
        {return element + 12}
    else
        {return element;}
    });
    return a_months;
}



