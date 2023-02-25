#include <LittleFS.h>

void setup() {
  Serial.begin(115200);
  
  // Initialize LittleFS
  if(!LittleFS.begin()){
    Serial.println("Error initializing LittleFS!");
    return;
  }
  
  // Open the file "deviceId.txt" in write mode
  File file = LittleFS.open("/deviceId.txt", "w");
  
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

void loop() {
  // Nothing to do here
}
