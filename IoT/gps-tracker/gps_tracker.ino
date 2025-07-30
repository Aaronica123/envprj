// GPS Tracker IoT Firmware for ESP32
// Features: GPS (NEO-6M), Wi-Fi, HTTP POST

#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPSPlus.h>
#include <HardwareSerial.h>

// Wi-Fi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend endpoint
const char* serverUrl = "http://your-backend/api/gps-data";

// Device configuration
const char* deviceId = "gps-001"; // Change this for each device

// GPS module on Serial2 (GPIO 16=RX2, 17=TX2)
HardwareSerial GPSSerial(2);
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);
  GPSSerial.begin(9600, SERIAL_8N1, 16, 17);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void loop() {
  while (GPSSerial.available() > 0) {
    gps.encode(GPSSerial.read());
  }
  if (gps.location.isUpdated()) {
    double lat = gps.location.lat();
    double lng = gps.location.lng();
    Serial.printf("Device: %s, Lat: %.6f, Lng: %.6f\n", deviceId, lat, lng);
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");
      String payload = String("{\"deviceId\":\"") + deviceId + "\",\"lat\":" + lat + ",\"lng\":" + lng + "}";
      int httpResponseCode = http.POST(payload);
      Serial.printf("POST %s => %d\n", serverUrl, httpResponseCode);
      http.end();
    }
    delay(60000); // Send every 1 minute
  }
} 