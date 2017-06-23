//temperatura controller
var mysql = require('mysql');

module.exports = {
    //funciones del controlador

    temperatura : function( req , res , next ){
        var config = require('.././database/config');

        var db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM temperatura ORDER BY cod_temperatura DESC LIMIT 1' , function(err, rows, fields){
            if(err) throw err;

            temp = rows;
            db.end();

            res.render('temperatura' , {
                temp : temp
            });

        });
    }
}
