#include <Wire.h>
#include <PN532_I2C.h>

PN532_I2C pn532i2c(Wire);

void setup() {
  Serial.begin(115200);
  Serial.println("PN532 NFC Module Test");

  pn532i2c.begin();

  uint32_t versiondata = pn532i2c.getFirmwareVersion();
  if (! versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);

}

void loop() {

}
