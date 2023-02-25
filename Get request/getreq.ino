#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";
const char* host = "dummy.restapiexample.com";
const String url = "/api/v1/employees";

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
    }
    http.end();
  }
  delay(5000);
}
