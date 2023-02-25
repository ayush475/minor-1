
/*********************************************************************
  This is an example for our Monochrome OLEDs based on SH110X drivers

  This example is for a 128x64 size display using I2C to communicate
  3 pins are required to interface (2 I2C and one reset)

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada  for Adafruit Industries.
  BSD license, check license.txt for more information
  All text above, and the splash screen must be included in any redistribution

  i2c SH1106 modified by Rupert Hirst  12/09/21
*********************************************************************/



#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

// this is for pn532 declaration
PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);
String tagId = "None";
byte nuidPICC[4];

/* Uncomment the initialize the I2C address , uncomment only one, If you get a totally blank screen try the other*/
#define i2c_Address 0x3c //initialize with the I2C addr 0x3C Typically eBay OLED's
//#define i2c_Address 0x3d //initialize with the I2C addr 0x3D Typically Adafruit OLED's

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1   //   QT-PY / XIAO
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


#define NUMFLAKES 10
#define XPOS 0
#define YPOS 1
#define DELTAY 2

void setup()   {
Serial.begin(115200);
Serial.println("System initialized");
display.begin(i2c_Address, true);
delay(250);
display.clearDisplay();
display.display();
nfc.begin();  
}


void loop() {
 
 readNFC();
 display.display();
  delay(2000);
  display.clearDisplay();
   
}


// thus is for nfc 
void readNFC() 
{
 
 if (nfc.tagPresent())
 {
    
   NfcTag tag = nfc.read();
 
     tag.print();
   tagId = tag.getUidString();
      Serial.println(tagId);
      

  display.setCursor(0, 0);

   display.clearDisplay();
  display.setTextSize(1);
 display.setTextColor(SH110X_WHITE);
    display.println("tag found");
   
   
   
  display.setTextSize(2);
   display.setTextColor(SH110X_WHITE);
  
  display.setCursor(2, 40);
  display.setTextSize(1);
  display.print(tagId);
  display.display();
  // delay(1000);
  display.clearDisplay();
  

      }
      
 
 delay(1000);

} 

  








