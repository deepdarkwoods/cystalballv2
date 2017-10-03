



//On MYSQL results from Forecast by customer, show table
ipcRenderer.on('SQLResults:Forecast',(event,res)=>{


    //Get names of column headers
    let monthNames = calcForecastMonths();

    //Create Table
    $("#results").tabulator({    

        pagination:"local",
        paginationSize:25,     
        selectable:true,
                                     
    columns:[
                    {title:"Customer Name", field:"customername", frozen:true,headerFilter:"input",width:130},
                    {title:"Sku", field:"sku", frozen:true,headerFilter:"input",width:100},
                    {title:"Description", field:"skudescription", frozen:true,headerFilter:"input"},
                    {title:"Customer Number", field:"customernumber",width:90},    

                    {//create column group
                        title:"Shipments by Period (Eaches)",
                        columns:[
                            {title:monthNames[13], field:"shipJAN2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[12], field:"shipFEB2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[11], field:"shipMAR2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[10], field:"shipAPR2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[9], field:"shipMAY2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[8], field:"shipJUN2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}}, 
                            {title:monthNames[7], field:"shipJUL2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[6], field:"shipAUG2017",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},  
                            
                            ,]
                    },//end column group

                    //spacer column
                    {
                        columns:[{title:""}],
                    },

                    {//create column group
                        title:"Forecast by Period (Eaches)",
                        columns:[
                            {title:monthNames[0], field:"SEP2017",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[1], field:"OCT2017",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[2], field:"NOV2017",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[3], field:"DEC2017",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[4], field:"JAN2018",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}},
                            {title:monthNames[5], field:"FEB2018",editor:"number",align:"right",formatter:"money",minWidth:60,formatterParams:{precision:"false"}} 
                            //{title:"Shipments / Forecast", field:"shipforecastarray",download:false, width:160, formatter:lineFormatter}                       

                            ,]
                    }//end column group

            ]

    });

    $("#results").tabulator("setData", res);

});





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
    date.getMonth()+6,
        //calculate PAST months headers from current date
    date.getMonth(),
    date.getMonth()-1,
    date.getMonth()-2,
    date.getMonth()-3,
    date.getMonth()-4,
    date.getMonth()-5,
    date.getMonth()-6,
    date.getMonth()-7,            
            
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