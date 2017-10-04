var app = require('electron').remote; 
var fs = require('fs');
const {dialog} = require('electron').remote;
var Excel = require('exceljs');


//Choose Excel File to read
function pickFile (){
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

            //get column 1
            let customer_number = worksheet.getColumn('A');
            console.log(customer_number);

        });


    });
}
