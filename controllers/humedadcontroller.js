//humedad controller
var mysql = require('mysql');

module.exports = {
    //funciones del controlador

    humedad : function( req , res , next ){
        var config = require('.././database/config');

        var db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM humedad ORDER BY cod_humedad DESC LIMIT 1' , function(err, rows, fields){
            if(err) throw err;

            humedad = rows;
            db.end();

            res.render('humedad' , {
                humedad : humedad
            });

        });
    }
}
