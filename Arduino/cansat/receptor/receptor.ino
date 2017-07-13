
#include <nRF24L01.h>
#include <RF24.h>
#include <RF24_config.h>
#include <SPI.h>
#include <Wire.h>

float msg[24];

RF24 radio(9,10);
const uint64_t pipe = 0xE8E8F0F0E1LL;  

void setup(void){
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(1,pipe);
  radio.startListening();
}
 
void loop(void){
  if (radio.available())
  {
    radio.read(msg, 24); 
    Serial.println();
    Serial.println("Humedad(%)     Temperatura(ºCelcius)     Presión(aPa)     Altitud(m/nm)     Latitud(deg)     Longitud(deg)");
    Serial.print(msg[0]);
    Serial.print("           ");
    Serial.print(msg[1]);
    Serial.print("                     ");
    Serial.print(msg[2]);
    Serial.print("        ");
    Serial.print(msg[3]);
    Serial.print("           ");
    Serial.print(msg[4]);
    Serial.print("             ");
    Serial.println(msg[5]);
    Serial.println("-----------------------------------------------------------------------------------------------------------");
  }
  else{
    //Serial.println("Falla en la conexión... :(");  
  }

  delay(500);
}
