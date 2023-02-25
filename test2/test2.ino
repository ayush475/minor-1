#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

Adafruit_SH1106G display = Adafruit_SH1106G(128, 64, &Wire, -1);
PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);
String tagId = "None";
byte nuidPICC[4];


void setup() {
  Wire.begin();
  Serial.begin(115200);
  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
  nfc.begin();
}

void loop() {
  display.println("hello world");
readNFC();

  delay(500);
}
void readNFC() 
{
 if (nfc.tagPresent())
 {
   NfcTag tag = nfc.read();
   tag.print();
    testdrawtriangle();
  //delay(2000);
  display.clearDisplay();

  //testfilltriangle();
  //delay(2000);
  display.clearDisplay();
    
   tagId = tag.getUidString();
 }
 delay(5000);
}
void testdrawtriangle(void) {
  for (int16_t i = 0; i < min(display.width(), display.height()) / 2; i += 5) {
    display.drawTriangle(display.width() / 2, display.height() / 2 - i,
                         display.width() / 2 - i, display.height() / 2 + i,
                         display.width() / 2 + i, display.height() / 2 + i, SH110X_WHITE);
    display.display();
    delay(1);
  }
}
