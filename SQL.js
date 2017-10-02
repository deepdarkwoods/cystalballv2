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
                        customernumber,customername,sku,
                        SUM(CASE WHEN customerforecast.period="2017-09-30" then customerforecast.quantity else 0 end) as 'SEP 2017',
                        SUM(CASE WHEN customerforecast.period="2017-10-28" then customerforecast.quantity else 0 end) as 'OCT 2017',
                        SUM(CASE WHEN customerforecast.period="2017-11-25" then customerforecast.quantity else 0 end) as 'NOV 2017',
                        SUM(CASE WHEN customerforecast.period="2017-12-31" then customerforecast.quantity else 0 end) as 'DEC 2017',
                        SUM(CASE WHEN customerforecast.period="2018-01-27" then customerforecast.quantity else 0 end) as 'JAN 2017',
                        SUM(CASE WHEN customerforecast.period="2018-02-24" then customerforecast.quantity else 0 end) as 'FEB 2017'
                        FROM customerforecast
                        GROUP BY customername,sku`);

        //Just customer is all
        }else if (customerid=="all") {

        //Just Forecast type is all
        }else if (forecasttype=="all"){


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
    SQLQueryCustomerForecast

};