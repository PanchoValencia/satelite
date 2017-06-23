DROP DATABASE IF EXISTS satelite;
CREATE DATABASE IF NOT EXISTS satelite;
USE satelite;

CREATE TABLE presion
(
    cod_presion INT PRIMARY KEY AUTO_INCREMENT,
    presion_atmosferica FLOAT NOT NULL,
    altitud FLOAT NOT NULL
);

CREATE TABLE temperatura
(
    cod_temperatura INT PRIMARY KEY AUTO_INCREMENT,
    grados_centigrados FLOAT NOT NULL
);

CREATE TABLE humedad
(
    cod_humedad INT PRIMARY KEY AUTO_INCREMENT,
    porcentaje_humedad FLOAT NOT NULL
);

CREATE TABLE geolocalizacion
(
    cod_geo INT PRIMARY KEY AUTO_INCREMENT,
    latitud VARCHAR(20) NOT NULL,
    longitud VARCHAR(20) NOT NULL
);
