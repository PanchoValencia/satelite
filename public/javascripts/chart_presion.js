'use strict';
var pa  = $('#presion_atmosferica').val(),
    alt = $('#altitud').val();

var datosPres = {
    labels : [
        ''
    ],
    datasets : [{
        label           : 'presión en  hPascales',
        backgroundColor : '#1755A3',
        data            : [ pa ]
    },
    {
        label           : 'altitud en metros',
        backgroundColor : '#1695A3',
        data            : [ alt ]
    }]
};

var canvas = document.getElementById('canvas_presion').getContext('2d');
window.pie = new Chart( canvas , {
    type    : 'bar',
    data    : datosPres ,
    options : {
        elements : {
            rectangle : {
                borderWidth   : 1,
                borderColor   : '#250250',
                borderSkipped : 'bottom'
            }
        },
        responsive : true,
        title      : {
            display   : true,
            text      : 'Gráfica de presión atmosférica',
            fontSize  : 20,
            padding   : 30,
            fontColor : '#1695A3'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero : true,
                    max         : 9000
                }
            }]
        }
    }
} );

setInterval(function(){
    location.reload(true);
},5000);
