//presion controller
var mysql = require('mysql');

module.exports = {
    //funciones del controlador

    pression : function( req , res , next ){
        var config = require('.././database/config');

        var db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM presion ORDER BY cod_presion DESC LIMIT 1' , function(err, rows, fields){
            if(err) throw err;

            presion = rows;
            db.end();

            res.render('presion' , {
                presion : presion
            });

        });
    }
}
