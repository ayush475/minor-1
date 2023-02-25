#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);

// Replace with your network credentials
const char* ssid = "123";
const char* password = "1234567890";

// Replace with your server URL and API endpoint
const char* serverUrl = "https://your_dummy_api.com";
const char* endpoint = "/your_endpoint";

void setup(void) {
  Serial.begin(115200);
  Serial.println("System initialized");

  // Connect to Wi-Fi
  WiFi.begin("123", "1234567890");
  Serial.printf("lol: %s\n", ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
    Serial.println(WiFi.status());
  }
  Serial.println("Connected to Wi-Fi");
  Serial.print("Local IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize NFC
  nfc.begin();
}

void loop() {
  readNFC();
}

void readNFC() {
  if (nfc.tagPresent()) {
    NfcTag tag = nfc.read();
    tag.print();
    String tagId = tag.getUidString();
    

    // Create a HTTP client
    WiFiClient client;
    HTTPClient http;

    // Make a POST request to the server
    String requestUrl = String(serverUrl) + String(endpoint);
    String requestBody = String("{\"tag_id\":\"") + String(tagId) + String("\"}");
    http.begin(client, requestUrl);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      Serial.printf("HTTP response code: %d\n", httpResponseCode);
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.printf("HTTP request failed with error code: %d\n", httpResponseCode);
    }
    http.end();
  }
  delay(5000);
}
