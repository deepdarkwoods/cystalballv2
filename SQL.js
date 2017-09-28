var mysql = require('mysql');


module.exports = {


    SQLQueryCustomerList: function() {
        
        
        return getConnection();

    },



    //stub method
    otherMethod: function() {}
}



function getConnection(){

    var connection = mysql.createConnection({
        host        :'localhost',
        user        :'root',
        password    :'root',
        database    :'dw' 
    });

    return connection;

}