#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

 
Adafruit_SH1106G display = Adafruit_SH1106G(128, 64, &Wire, -1);

PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);
String tagId = "None";
byte nuidPICC[4];
 
void setup(void) 
{
  Serial.begin(9600);
  display.begin(0x3c, true);
 Serial.begin(115200);
 Serial.println("System initialized");
 nfc.begin();
}
 
void loop() 
{
 readNFC();
}
 
void readNFC() 
{
 if (nfc.tagPresent())
 {
   NfcTag tag = nfc.read();
   tag.print();
   tagId = tag.getUidString();
 }
 delay(5000);
}