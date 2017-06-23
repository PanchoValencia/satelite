var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');

/* HOME PAGE */
router.get('/', controllers.homecontroller.index);

/* MENU PAGE */
router.get('/conocenos' , controllers.conocenoscontroller.conocenos);
router.get('/temperatura' , controllers.temperaturacontroller.temperatura);
router.get('/humedad' , controllers.humedadcontroller.humedad);
router.get('/presion' , controllers.presioncontroller.pression);
router.get('/geolocalizacion' , controllers.gpscontroller.geo);

module.exports = router;
