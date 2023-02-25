#include <FS.h>
#include <LittleFS.h>
#include <ESP8266WiFi.h>

#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

// custom headers
#include <headers/Internet.h>
#include <headers/Sound.h>
#include <headers/Display.h>
#include <headers/Gps.h>
// Replace with your network credentials
const char *ssid = "123";            // Replace with your own SSID
const char *password = "1234567890"; // Replace with your own password

const int ledPin = 2;
String ledState;

static const int RXPin = D5, TXPin = D6;
static const uint32_t GPSBaud = 9600;

// The TinyGPSPlus object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);
unsigned long lastRead;        // variable to store the time of the last GPS reading
unsigned long interval = 5000; // interval between GPS readings in milliseconds

String getGpsLocation()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    // Serial.print(gps.location.lat(), 6);
    // Serial.print(F(","));
    // Serial.print(gps.location.lng(), 6);

    String latndLng;

    //     // while (ss.available() > 0)
    //     // {
    //     //     if (gps.encode(ss.read()))
    //     //     {
    //     //         //  displayInfo();
    //     //         Serial.println("done serial");

    float lat = gps.location.lat();
    char charData[20];
    sprintf(charData, "%.6f", lat);
    // Serial.println(charData);
    latndLng = String(charData);
    latndLng = latndLng + ",";
    // Serial.println(latndLng);
    // Serial.println("and");
    float lng = gps.location.lng();
    sprintf(charData, "%.6f", lng);
    latndLng = latndLng + String(charData);

    Serial.println(latndLng);
    return latndLng;
  }
  else
  {
    Serial.print(F("INVALID"));
    return "INVALID";
  }
}

void setup()
{

  Serial.begin(9600);

  // gps portion
  ss.begin(GPSBaud);

  // led portion
  pinMode(ledPin, OUTPUT);

  // Initialize LittleFS
  if (!LittleFS.begin())
  {
    Serial.println("An Error has occurred while mounting LittleFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());

  // creating mobile hotspot;

  // WiFi.softAP("MyHotspot", "password");
  // IPAddress myIP = WiFi.softAPIP();
  // Serial.print("AP IP address: ");
  // Serial.println(myIP);
}

void loop()
{
  // This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0)
  {
    if (gps.encode(ss.read()))
    {
    String data=getGpsLocation();
    if(data=="INVALID"){
      break;
    }else{
      Serial.println("sending data to server");
      sendPostRequest(data);
      delay(5000);
    }
    }
  }

  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true)
      ;
  }

  // calculate the time since the last GPS reading
  // unsigned long now = millis();
  // unsigned long timeSinceLastRead = now - lastRead;
  // check if the interval has passed
  // if (timeSinceLastRead >= interval)
  // {
  //     // if the interval has passed, update the lastRead variable and repeat the process
  //     lastRead = now;
  // }
  // else
  // {
  //     // if the interval has not passed, delay for the remaining time
  //     delay(interval - timeSinceLastRead);
  // }
  // delay(5000);
}