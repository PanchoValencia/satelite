//home controller

module.exports = {
    //funciones del controlador

    index : function( req , res , next ){
        res.render( 'index' , {titulo : 'Muestreo de datos'} );
    }
}
