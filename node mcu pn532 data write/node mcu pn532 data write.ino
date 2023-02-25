#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>

PN532_I2C pn532i2c(Wire);
PN532 nfc(pn532i2c);

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // Initialize the NFC module
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("Didn't find PN53x board");
    while (1);
  }
  // Got ok data, print it out!
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  // configure board to read RFID tags
  nfc.SAMConfig();
}

void loop() {
  // Check if a tag is available to read
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)

  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if (success) {
    // Display the UID
    Serial.println("Found an ISO14443A card");
    Serial.print("  UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    Serial.print("  UID Value: ");
    for (uint8_t i=0; i < uidLength; i++) {
      Serial.print(" 0x");Serial.print(uid[i], HEX); 
    }
    Serial.println("");

    // Write data to the tag
    uint8_t data[] = {'H','E','L','P','A','N'};
    success = nfc.mifareclassic_WriteDataBlock(4, data);
    if (success) {
      Serial.println("Data written to tag successfully");
      delay(3000);
    } else {
      Serial.println("Failed to write data to tag");
    }
  } else {
    Serial.println("Waiting for a tag to write data to...");
    delay(500);
  }
  delay(2000);
}
