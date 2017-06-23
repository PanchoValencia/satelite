//gps controller
var mysql = require('mysql');

module.exports = {
    //funciones del controlador

    geo : function( req , res , next ){
        var config = require('.././database/config');

        var db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM geolocalizacion ORDER BY cod_geo DESC LIMIT 1' , function(err, rows, fields){
            if(err) throw err;

            geo = rows;

            db.end();

            res.render('gps' , {
                geo : geo
            });

        });
    }
}
