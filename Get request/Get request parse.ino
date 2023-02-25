#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";
const char* host = "jsonplaceholder.typicode.com";
const String url = "/posts/1";

void setup() {
  Serial.begin(115200);
  WiFi.begin("123", "1234567890");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure(); // Allow SSL with self-signed certificates
    HTTPClient http;
    String requestUrl = "https://" + String(host) + url;
    http.begin(client, requestUrl);
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);

      // Parse JSON payload
      size_t capacity = JSON_OBJECT_SIZE(4) + 40;
      DynamicJsonDocument doc(capacity);

      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        if (error.code() == DeserializationError::NoMemory) {
          // If not enough memory, try to increase capacity and retry
          //yo code mg ho

          capacity += 1024;
          // mathi bata capacity badhayepaxi matra kam garyo
          DynamicJsonDocument doc(capacity);
          error = deserializeJson(doc, payload);
        }
        if (error) {
          Serial.print("deserializeJson() failed: ");
          Serial.println(error.c_str());
          return;
        }
      }

      // Extract data fields
      int userId = doc["userId"];
      //euta matra lida error aayena
      //paxi esma success lai matra parse hannu parxa 
      //   fuck my life lol

      Serial.print("User ID: ");
      Serial.println(userId);
    }
    http.end();
  }
  delay(5000);
}
