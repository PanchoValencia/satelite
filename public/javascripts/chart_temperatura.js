'use strict';
var gc       = $('#gradosCentigrados').val(),
    restante = 100 - gc;

var datosTemp = {
    labels : [
        'Temperatura en grados celcius'
    ],
    datasets : [{
        label           : 'º Celcius',
        backgroundColor : '#1695A3',
        data            : [ gc ]
    }]
};

var canvas = document.getElementById('canvas_temperatura').getContext('2d');
window.pie = new Chart( canvas , {
    type    : 'bar',
    data    : datosTemp ,
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
            text      : 'Gráfica de temperatura',
            fontSize  : 20,
            padding   : 30,
            fontColor : '#1695A3'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero : true,
                    max         : 100
                }
            }]
        }
    }
} );

setInterval(function(){
    location.reload(true);
    if( toggleVert == 1 )
    {
        $('#nav').animate({
            'height' : 'hide'
        },0);
    }
    else if ( toggleVert == 1 )
    {
        $('#nav').animate({
            'width' : 'hide'
        },0);
    }
},5000);
