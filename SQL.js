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
    SQLQueryCustomerList

};