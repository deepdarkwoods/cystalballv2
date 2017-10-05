var app = require('electron').remote; 
var fs = require('fs');
const {dialog} = require('electron').remote;
var Excel = require('exceljs');


//Choose Excel File to read
function pickFile (){

    let forecast_array = [];

    dialog.showOpenDialog((fileNames) => {

        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }


        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(fileNames[0])
        .then(function() {
            // use workbook

            //get worksheet
            let worksheet = workbook.getWorksheet('Sheet1');       

            // Iterate over all rows that have values in a worksheet
            worksheet.eachRow(function(row, rowNumber) {
                //row.values

                    var element = {};
                    element.customer_number = row.values[1];
                    element.sku = row.values[2];
                    element.forecast_type = row.values[3];

                    element.m1_forecast = row.values[4];
                    element.m2_forecast = row.values[5];
                    element.m3_forecast = row.values[6];
                    element.m4_forecast = row.values[7];
                    element.m5_forecast = row.values[8];
                    element.m6_forecast = row.values[9];

                    forecast_array.push(element);



            });
                console.log(forecast_array);
    
                $("#results").tabulator({  

                    columns:[
                        {title:"Customer Number", field:"customer_number", width:130},
                        {title:"Sku", field:"sku", width:100},
                        {title:"Type", field:"forecast_type", width:100},
                        {title:"4cast1", field:"m1_forecast", width:100},
                        {title:"4cast2", field:"m2_forecast", width:100},
                        {title:"4cast3", field:"m3_forecast", width:100},
                        {title:"4cast4", field:"m4_forecast", width:100},
                        {title:"4cast5", field:"m5_forecast", width:100},
                        {title:"4cast6", field:"m6_forecast", width:100}

                    ]

                });


                $("#results").tabulator("setData", forecast_array);

        });


    });
}







