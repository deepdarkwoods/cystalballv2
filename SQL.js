var mysql = require('mysql');



//Query MYSQL for list of customers who have forecast
let SQLQueryCustomerList = (callback) =>{      

    let query = (`SELECT DISTINCT customernumber,customername
                FROM customerforecast
                ORDER BY customername` ); 

    let connection = getConnection();

    connection.query(query,function(error,customers){
        if (error) console.log(error);                    
            
        return callback(customers);
    });   

    connection.end(function(){
        console.log("Connection Terminated");
    });    

}






//Query MYSQL for forecast by customer and type
let SQLQueryCustomerForecast = (customerid, forecasttype, callback) =>{        
        let query;
        //All customers and all forecast types
        if(customerid=="all" && forecasttype==="all"){
                query = (`SELECT
                        customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                        sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                        sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                        SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                        SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                        SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                        SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                        SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                        SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                        
                        FROM customerforecast
                        LEFT JOIN
                        (SELECT customernumber,sku,
                        SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                        FROM shiphistory
                        GROUP BY shiphistory.customername,shiphistory.sku) as sh
                        ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                        GROUP BY customerforecast.customername,customerforecast.sku
                    `);

        //Just customer is all
        }else if (customerid=="all") {
                query = (`SELECT
                        customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                        sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                        sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                        SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                        SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                        SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                        SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                        SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                        SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                        
                        FROM customerforecast
                        LEFT JOIN
                        (SELECT customernumber,sku,
                        SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                        FROM shiphistory
                        GROUP BY shiphistory.customername,shiphistory.sku) as sh
                        ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                        WHERE forecasttype = '${forecasttype}'
                        GROUP BY customerforecast.customername,customerforecast.sku
                        `);


        //Just Forecast type is all
        }else if (forecasttype=="all"){

                query = (`SELECT
                        customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                        sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                        sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                        SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                        SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                        SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                        SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                        SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                        SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                        
                        FROM customerforecast
                        LEFT JOIN
                        (SELECT customernumber,sku,
                        SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                        FROM shiphistory
                        GROUP BY shiphistory.customername,shiphistory.sku) as sh
                        ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                        WHERE customerforecast.customernumber = '${customerid}'
                        GROUP BY customerforecast.customername,customerforecast.sku
                        `);
        }else {

                query = (`SELECT
                        customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                        sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                        sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                        SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                        SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                        SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                        SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                        SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                        SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                        
                        FROM customerforecast
                        LEFT JOIN
                        (SELECT customernumber,sku,
                        SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                        SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                        FROM shiphistory
                        GROUP BY shiphistory.customername,shiphistory.sku) as sh
                        ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                        WHERE customerforecast.customernumber = '${customerid}' and forecasttype = '${forecasttype}'
                        GROUP BY customerforecast.customername,customerforecast.sku
                        `);


        }


        let connection = getConnection();
    
        connection.query(query,function(error,forecast){
            if (error) console.log(error);                    
                
            return callback(forecast);
        });   
    
        connection.end(function(){
            console.log("Connection Terminated");
        });    
    
    }





//Query MYSQL for list of skus with forecast
let SQLQuerySkuList = (callback) =>{  

    let query = (`SELECT DISTINCT sku,skudescription
                FROM customerforecast
                ORDER BY sku` ); 

    let connection = getConnection();

    connection.query(query,function(error,skus){
    if (error) console.log(error);                    

    callback(skus);
    
    });   

    connection.end(function(){
    console.log("Connection Terminated");
    });    



}



//Query MYSQL for forecast by sku and type
let SQLQuerySkuForecast = (sku, forecasttype, callback) =>{        
    let query;
    //All customers and all forecast types
    if(sku=="all" && forecasttype==="all"){
            query = (`SELECT
                    customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                    sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                    sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                    SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                    SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                    SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                    SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                    SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                    SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                    
                    FROM customerforecast
                    LEFT JOIN
                    (SELECT customernumber,sku,
                    SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                    FROM shiphistory
                    GROUP BY shiphistory.customername,shiphistory.sku) as sh
                    ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                    GROUP BY customerforecast.sku,customerforecast.customername                    
                    
                    `);

    //Just customer is all
    }else if (sku=="all") {
            query = (`SELECT
                    customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                    sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                    sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                    SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                    SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                    SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                    SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                    SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                    SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                    
                    FROM customerforecast
                    LEFT JOIN
                    (SELECT customernumber,sku,
                    SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                    FROM shiphistory
                    GROUP BY shiphistory.customername,shiphistory.sku) as sh
                    ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                    WHERE customerforecast.forecasttype = '${forecasttype}'                    
                    GROUP BY customerforecast.sku,customerforecast.customername 
                    `);


    //Just Forecast type is all
    }else if (forecasttype=="all"){

            query = (`SELECT
                    customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                    sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                    sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                    SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                    SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                    SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                    SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                    SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                    SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                    
                    FROM customerforecast
                    LEFT JOIN
                    (SELECT customernumber,sku,
                    SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                    FROM shiphistory
                    GROUP BY shiphistory.customername,shiphistory.sku) as sh
                    ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                    WHERE customerforecast.sku = '${sku}'
                    GROUP BY customerforecast.sku,customerforecast.customername 
                    `);
    }else{

            query = (`SELECT
                    customerforecast.customernumber,customerforecast.customername,customerforecast.sku,customerforecast.skudescription,
                    sh.shipJAN2017, sh.shipFEB2017, sh.shipMAR2017, sh.shipAPR2017, sh.shipMAY2017, sh.shipJUN2017, 
                    sh.shipJUL2017,sh.shipAUG2017,sh.shipSEP2017,
                    SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP2017',
                    SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT2017',
                    SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV2017',
                    SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC2017',
                    SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN2018',
                    SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB2018'
                    
                    FROM customerforecast
                    LEFT JOIN
                    (SELECT customernumber,sku,
                    SUM(CASE WHEN shiphistory.monthenddate="2017-09-30" then shiphistory.shipqty else 0 end) as 'shipSEP2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-08-26" then shiphistory.shipqty else 0 end) as 'shipAUG2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-29" then shiphistory.shipqty else 0 end) as 'shipJUL2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-07-01" then shiphistory.shipqty else 0 end) as 'shipJUN2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-05-27" then shiphistory.shipqty else 0 end) as 'shipMAY2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-29" then shiphistory.shipqty else 0 end) as 'shipAPR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-04-01" then shiphistory.shipqty else 0 end) as 'shipMAR2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-02-25" then shiphistory.shipqty else 0 end) as 'shipFEB2017',
                    SUM(CASE WHEN shiphistory.monthenddate="2017-01-28" then shiphistory.shipqty else 0 end) as 'shipJAN2017'
                    FROM shiphistory
                    GROUP BY shiphistory.customername,shiphistory.sku) as sh
                    ON customerforecast.customernumber = sh.customernumber AND customerforecast.sku = sh.sku
                    WHERE customerforecast.sku = '${sku}' and customerforecast.forecasttype = '${forecasttype}'
                    GROUP BY customerforecast.sku,customerforecast.customername 
                    `);


    }


    let connection = getConnection();

    connection.query(query,function(error,forecast){
        if (error) console.log(error);                    
            
        return callback(forecast);
    });   

    connection.end(function(){
        console.log("Connection Terminated");
    });    

}


//Query MYSQL for forecast by sku and type
let SQLAddForecast = (forecast_array, callback) =>{        

    let connection = getConnection();    

    let query;

    let monthDates = [(2017,10,28),(2017,11,25),(2017,12,31),(2018,01,27),(2018,01,27),(2018,01,27)]


    for(let i=0;i<forecast_array.length;i++){

        for(let j=0;j<6;j++){
        query = (`INSERT INTO customerforecast
                  (customernumber,customername,sku,forecastype,period,qty)
                  VALUES
                  (${forecast_array[i].customer_number},
                    ${forecast_array[i].customer_name},
                    ${forecast_array[i].sku},
                    ${forecast_array[i].forecast_type}


                  )
        
                `)

   
        } 
    }
        // let query = (`SELECT DISTINCT sku,skudescription
        //               FROM customerforecast
        //               ORDER BY sku` ); 

 

    // connection.query(query,function(error,skus){
    // if (error) console.log(error);                    

    //callback(skus);

    // });   

    connection.end(function(){
    console.log("Connection Terminated");
    });    


};






//Return connection from MYSQL
function getConnection(){

    var connection = mysql.createConnection({
        host        :'localhost',
        user        :'root',
        password    :'root',
        database    :'ball' 
    });

    return connection;

}




//List functions you want to export back to app.js
module.exports = {
    SQLQueryCustomerList,
    SQLQueryCustomerForecast,
    SQLQuerySkuList,
    SQLQuerySkuForecast,
    SQLAddForecast

};