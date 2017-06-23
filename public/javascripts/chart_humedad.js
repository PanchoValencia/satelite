'use strict';
var ph       = $('#porcentaje_humedad').val(),
    restante = 100 - ph;

var datosHumedad = {
    type : 'pie',

    data : {
        datasets : [{
            data : [
                ph,
                restante,
            ],
            backgroundColor : [
                '#EB7F00',
                '#ACF0F2',
            ],
        }],
        labels : [
            'Porcentaje de humedad',
            'Resto',
        ]
    },

    options : {
        responsive : true,
        title      : {
            display   : true,
            text      : 'Gráfica de humedad',
            fontSize  : 20,
            padding   : 30,
            fontColor : '#1695A3'
        },
    }
};

var canvasHu = document.getElementById('canvas_humedad').getContext('2d');
window.pie   = new Chart( canvasHu , datosHumedad );

setInterval(function(){
    location.reload(true);
},5000);
