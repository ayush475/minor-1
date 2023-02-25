

#include <SPI.h>

#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);
String tagId = "None";
byte nuidPICC[4];
 




#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1   //   QT-PY / XIAO
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);




void setup()   {
   Serial.begin(115200);
 Serial.println("System initialized");
 nfc.begin();

  Serial.begin(9600);

  // Show image buffer on the display hardware.
  // Since the buffer is intialized with an Adafruit splashscreen
  // internally, this will display the splashscreen.

  delay(250); // wait for the OLED to power up
  display.begin(0x3c, true); // Address 0x3C default
 //display.setContrast (0); // dim display
 
  display.display();
  delay(2000);
  display.clearDisplay();



  // text display tests
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 0);
  display.println("Failure is always an option");
  display.setTextColor(SH110X_BLACK, SH110X_WHITE); // 'inverted' text
  display.println(3.141592);
  display.setTextSize(2);
  display.setTextColor(SH110X_WHITE);
  display.println("hello mg");

  display.display();
  delay(2000);
  display.clearDisplay();

  // miniature bitmap display

   


  

}


void loop() {
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


