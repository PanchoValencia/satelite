#include <SoftwareSerial.h>

#include <TinyGPS.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <RF24_config.h>
#include <SPI.h>
#include <Adafruit_BMP085.h>


//TEMPERATURA Y HUMEDAD
#include "SparkFunHTU21D.h"
#include <Wire.h>

//Temperatura y humedad
HTU21D myHumidity;
Adafruit_BMP085 bmp180;

TinyGPS gps;
SoftwareSerial ss(3, 2);

float msg[24] ;    // Array a transmitir


RF24 radio(9,10);                        // Creamos un objeto radio del tipo RF2$
const uint64_t pipe = 0xE8E8F0F0E1LL;    // Usamos este canal
/* This sample code demonstrates the normal use of a TinyGPS object.
   It requires the use of SoftwareSerial, and assumes that you have a
   4800-baud serial GPS device hooked up on pins 4(rx) and 3(tx).
*/

static void smartdelay(unsigned long ms);
static void print_float(float val, float invalid, int len, int prec);
static void print_int(unsigned long val, unsigned long invalid, int len);
static void print_date(TinyGPS &gps);
static void print_str(const char *str, int len);

void setup()
{
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(pipe);
  //Inicializacion de temperatura y humedad (DTH11)
  myHumidity.begin();
  bmp180.begin();
  ss.begin(9600);
  
  Serial.println();
  Serial.println("Latitud  Longitud       Humedad     Temperatura         Presión         Altitud");
  Serial.println(" (deg)     (deg)           %         grados Celcius        Pa              m/nm   ");
  Serial.println("----------------------------------------------------------------------------------");
}

void loop()
{
  float flat, flon;
  static const double LONDON_LAT = 20.6736, LONDON_LON = -103.344;
  
  gps.f_get_position(&flat, &flon);
  print_float(flat, TinyGPS::GPS_INVALID_F_ANGLE, 10, 6);
  print_float(flon, TinyGPS::GPS_INVALID_F_ANGLE, 11, 6);

  float Hum = myHumidity.readHumidity();
  //Temperatura
  float Temp = myHumidity.readTemperature();

  float presion = bmp180.readPressure();
  float altitud = bmp180.readAltitude()+98;
  
  msg[0] = Hum;
  msg[1] = Temp;
  msg[2] = presion;
  msg[3] = altitud;
  msg[4] = flat;
  msg[5] = flon;

  bool envio = radio.write(msg, 24);

  if(!envio){

      
      //Serial.println("    Humedad(%)     Temperatura(ºCelcius)     Presión(hPa)     Altitud(m/nm)     Latitud(deg)     Longitud(deg)");
      Serial.print("    ");
      Serial.print(msg[0]);
      Serial.print("          ");
      Serial.print(msg[1]);
      Serial.print("            ");
      Serial.print(msg[2]);
      Serial.print("         ");
      Serial.println(msg[3]);
      Serial.println("----------------------------------------------------------------------------------------------");
      radio.write(msg, 24);
      
    }
    else{
        //Serial.println();
        //Serial.println("Error al enviar datos");
      }

  Serial.println();
  
  smartdelay(500);
}

static void smartdelay(unsigned long ms)
{
  unsigned long start = millis();
  do 
  {
    while (ss.available())
      gps.encode(ss.read());
  } while (millis() - start < ms);
}

static void print_float(float val, float invalid, int len, int prec)
{
  if (val == invalid)
  {
    while (len-- > 1)
      Serial.print('*');
    Serial.print(' ');
  }
  else
  {
    Serial.print(val, prec);
    int vi = abs((int)val);
    int flen = prec + (val < 0.0 ? 2 : 1); // . and -
    flen += vi >= 1000 ? 4 : vi >= 100 ? 3 : vi >= 10 ? 2 : 1;
    for (int i=flen; i<len; ++i)
      Serial.print(' ');
  }
  smartdelay(0);
}

static void print_int(unsigned long val, unsigned long invalid, int len)
{
  char sz[32];
  if (val == invalid)
    strcpy(sz, "*******");
  else
    sprintf(sz, "%ld", val);
  sz[len] = 0;
  for (int i=strlen(sz); i<len; ++i)
    sz[i] = ' ';
  if (len > 0) 
    sz[len-1] = ' ';
  Serial.print(sz);
  smartdelay(0);
}

static void print_date(TinyGPS &gps)
{
  int year;
  byte month, day, hour, minute, second, hundredths;
  unsigned long age;
  gps.crack_datetime(&year, &month, &day, &hour, &minute, &second, &hundredths, &age);
  if (age == TinyGPS::GPS_INVALID_AGE)
    Serial.print("********** ******** ");
  else
  {
    char sz[32];
    sprintf(sz, "%02d/%02d/%02d %02d:%02d:%02d ",
        month, day, year, hour, minute, second);
    Serial.print(sz);
  }
  print_int(age, TinyGPS::GPS_INVALID_AGE, 5);
  smartdelay(0);
}

static void print_str(const char *str, int len)
{
  int slen = strlen(str);
  for (int i=0; i<len; ++i)
    Serial.print(i<slen ? str[i] : ' ');
  smartdelay(0);
}
