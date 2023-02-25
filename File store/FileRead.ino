#include <LittleFS.h>

void setup() {
  Serial.begin(115200);

  // Initialize LittleFS
  if (!LittleFS.begin()) {
    Serial.println("Error initializing LittleFS!");
    return;
  }

  // Open the file "data.txt" in read mode
  File file = LittleFS.open("/deviceId.txt", "r");
  
  if (!file) {
    Serial.println("Error opening file!");
    return;
  }

  // Read the contents of the file
  String data = file.readString();
  
  // Close the file
  file.close();

  Serial.println("Data read from file:");
  Serial.println(data);
}

void loop() {
  // Nothing to do here
}
