#include <LittleFS.h>
// void setup() {
//   Serial.begin(115200);
//   LittleFS.begin();
//    if (!LittleFS.begin()) {
//     Serial.println("Error initializing LittleFS!");
//     return;
//   }
// }
// void  ReadFile( const char* filename){
//   //  File file = LittleFS.open("/deviceId.txt", "r");
//     File file = LittleFS.open(FilePath, "r");

//     if (!file) {
//     Serial.println("Error opening file!");
//     return;
//   }
//   String data = file.readString();
  
//   // Close the file
//   file.close();

//   Serial.println("Data read from file:");
//   Serial.println(data);
  
// }
void ReadFile(const char* filename) {
  File file = LittleFS.open(filename, "r");
  if (!file) {
    Serial.println("Failed to open file");
    return;
  }

  while (file.available()) {
    Serial.write(file.read());
  }

  file.close();
}
void  WriteData( const char* filename){
  File file = LittleFS.open(filename, "w");
  
  if (!file) {
    Serial.println("Error opening file!");
    return;
  }
  
  // Write some data to the file (in this example, we're writing the string "my_device_id")
  file.print("ayush don");
  
  // Close the file
  file.close();
  
  // Print a message to indicate that the file has been written
  Serial.println("Device ID file written to LittleFS");
}
// void loop(){
  
// }