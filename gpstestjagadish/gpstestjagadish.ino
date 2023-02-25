#include <SoftwareSerial.h>

#define rxPin 12
#define txPin 13
SoftwareSerial sim800L(rxPin,txPin); 

void setup()
{
  //Begin serial communication with Arduino and Arduino IDE (Serial Monitor)
  Serial.begin(115200);
  
  //Begin serial communication with Arduino and SIM800L
  sim800L.begin(9600);

  Serial.println("Initializing...");
  delay(1000);
}

void loop()
{
  while(sim800L.available()){
    Serial.println(sim800L.readString());
  }
  while(Serial.available())  {
    sim800L.println(Serial.readString());
  }
}