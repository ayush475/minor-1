// #include <TinyGPSPlus.h>
// #include <SoftwareSerial.h>
// // /*
// //    This sample sketch demonstrates the normal use of a TinyGPSPlus (TinyGPSPlus) object.
// //    It requires the use of SoftwareSerial, and assumes that you have a
// //    4800-baud serial GPS device hooked up on pins 4(rx) and 3(tx).
// // */
// static const int RXPin = 4, TXPin = 3;
// static const uint32_t GPSBaud = 9600;

// // The TinyGPSPlus object
// TinyGPSPlus gps;

// // The serial connection to the GPS device
// SoftwareSerial ss(RXPin, TXPin);

// void firstsetup()
// {

//     ss.begin(9600);

//     Serial.println(F("DeviceExample.ino"));
//     Serial.println(F("A simple demonstration of TinyGPSPlus with an attached GPS module"));
//     Serial.print(F("Testing TinyGPSPlus library v. "));
//     Serial.println(TinyGPSPlus::libraryVersion());
//     Serial.println(F("by Mikal Hart"));
//     Serial.println();
// }

// // void loop()
// // {
// //   // This sketch displays information every time a new sentence is correctly encoded.
// //   while (ss.available() > 0)
// //     if (gps.encode(ss.read()))
// //       displayInfo();

// //   if (millis() > 5000 && gps.charsProcessed() < 10)
// //   {
// //     Serial.println(F("No GPS detected: check wiring."));
// //     while(true);
// //   }
// // }

// // void displayGpsInfo()
// // {
// //   Serial.print(F("Location: "));
// //   if (gps.location.isValid())
// //   {
// //     Serial.print(gps.location.lat(), 6);
// //     Serial.print(F(","));
// //     Serial.print(gps.location.lng(), 6);
// //   }
// //   else
// //   {
// //     Serial.print(F("INVALID"));
// //   }

// //   Serial.print(F("  Date/Time: "));
// //   if (gps.date.isValid())
// //   {
// //     Serial.print(gps.date.month());
// //     Serial.print(F("/"));
// //     Serial.print(gps.date.day());
// //     Serial.print(F("/"));
// //     Serial.print(gps.date.year());
// //   }
// //   else
// //   {
// //     Serial.print(F("INVALID"));
// //   }

// //   Serial.print(F(" "));
// //   if (gps.time.isValid())
// //   {
// //     if (gps.time.hour() < 10) Serial.print(F("0"));
// //     Serial.print(gps.time.hour());
// //     Serial.print(F(":"));
// //     if (gps.time.minute() < 10) Serial.print(F("0"));
// //     Serial.print(gps.time.minute());
// //     Serial.print(F(":"));
// //     if (gps.time.second() < 10) Serial.print(F("0"));
// //     Serial.print(gps.time.second());
// //     Serial.print(F("."));
// //     if (gps.time.centisecond() < 10) Serial.print(F("0"));
// //     Serial.print(gps.time.centisecond());
// //   }
// //   else
// //   {
// //     Serial.print(F("INVALID"));
// //   }

// //   Serial.println();
// // }

// void displayInfo()
// {
//     Serial.print(F("Location: "));
//     if (gps.location.isValid())
//     {
//         Serial.print(gps.location.lat(), 6);
//         Serial.print(F(","));
//         Serial.print(gps.location.lng(), 6);
//     }
//     else
//     {
//         Serial.print(F("INVALID"));
//     }

//     Serial.print(F("  Date/Time: "));
//     if (gps.date.isValid())
//     {
//         Serial.print(gps.date.month());
//         Serial.print(F("/"));
//         Serial.print(gps.date.day());
//         Serial.print(F("/"));
//         Serial.print(gps.date.year());
//     }
//     else
//     {
//         Serial.print(F("INVALID"));
//     }

//     Serial.print(F(" "));
//     if (gps.time.isValid())
//     {
//         if (gps.time.hour() < 10)
//             Serial.print(F("0"));
//         Serial.print(gps.time.hour());
//         Serial.print(F(":"));
//         if (gps.time.minute() < 10)
//             Serial.print(F("0"));
//         Serial.print(gps.time.minute());
//         Serial.print(F(":"));
//         if (gps.time.second() < 10)
//             Serial.print(F("0"));
//         Serial.print(gps.time.second());
//         Serial.print(F("."));
//         if (gps.time.centisecond() < 10)
//             Serial.print(F("0"));
//         Serial.print(gps.time.centisecond());
//     }
//     else
//     {
//         Serial.print(F("INVALID"));
//     }

//     Serial.println();
// }

// unsigned long lastRead;        // variable to store the time of the last GPS reading
// unsigned long interval = 5000; // interval between GPS readings in milliseconds

// String getGpsLatAndLng()
// {
//     String latndLng;

//     // while (ss.available() > 0)
//     // {
//     //     if (gps.encode(ss.read()))
//     //     {
//     //         //  displayInfo();
//     //         Serial.println("done serial");

//     //         if (gps.location.isValid())
//     //         {

//     //             float lat = gps.location.lat();
//     //             char charData[20];
//     //             sprintf(charData, "%.6f", lat);
//     //             // Serial.println(charData);
//     //             latndLng = String(charData);
//     //             latndLng = latndLng + ",";
//     //             // Serial.println(latndLng);
//     //             // Serial.println("and");
//     //             float lng = gps.location.lng();
//     //             sprintf(charData, "%.6f", lng);
//     //             latndLng = latndLng + String(charData);

//     //             // Serial.println(latndLng);
//     //         }
//     //         else
//     //         {
//     //             // Serial.print(F("INVALID"));
//     //             latndLng = "invalid";
//     //         }
//     //     }
//     // }

//     // if (millis() > 5000 && gps.charsProcessed() < 10)
//     // {
//     //     Serial.println(F("No GPS detected: check wiring."));
//     //     while (true)
//     //         ;
//     // }
//     while (!gps.location.isValid())
//     { // while the location is not valid
//         if (ss.available() > 0)
//         {                          // check if there is data available on the serial port
//             gps.encode(ss.read()); // decode the data using the TinyGPS++ object
//         }
//     }

//     //    Serial.print("Latitude: ");
//     //   Serial.print(gps.location.lat(), 6);
//     //   Serial.print(" Longitude: ");
//     //   Serial.println(gps.location.lng(), 6);

//     float lat = gps.location.lat();
//     char charData[20];
//     sprintf(charData, "%.6f", lat);
//     // Serial.println(charData);
//     latndLng = String(charData);
//     latndLng = latndLng + ",";
//     // Serial.println(latndLng);
//     // Serial.println("and");
//     float lng = gps.location.lng();
//     sprintf(charData, "%.6f", lng);
//     latndLng = latndLng + String(charData);

//     // Serial.println(latndLng);

//     // calculate the time since the last GPS reading
//     unsigned long now = millis();
//     unsigned long timeSinceLastRead = now - lastRead;

//     // check if the interval has passed
//     if (timeSinceLastRead >= interval)
//     {
//         // if the interval has passed, update the lastRead variable and repeat the process
//         lastRead = now;
//     }
//     else
//     {
//         // if the interval has not passed, delay for the remaining time
//         delay(interval - timeSinceLastRead);
//     }

//     //    Serial.println("final");
//     return latndLng;
// }

// void readgps(){
//   static unsigned long lastRead = 0;
//   if (millis() - lastRead > 5000) {
//     while (ss.available() > 0) {
//       gps.encode(ss.read());
//     }
//     if (gps.location.isValid()) {
//       Serial.print("Latitude: ");
//       Serial.print(gps.location.lat(), 6);
//       Serial.print(" Longitude: ");
//       Serial.println(gps.location.lng(), 6);
//     }else{
//         Serial.println("invalid location");
//     }
//     lastRead = millis();
//   }
// }