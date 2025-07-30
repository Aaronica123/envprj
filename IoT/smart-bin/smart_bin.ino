// Smart Bin IoT Firmware for ESP32
// Features: Bin fullness (HC-SR04), optional temperature (DS18B20), Wi-Fi, HTTP POST

#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Wi-Fi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend endpoint
const char* serverUrl = "http://your-backend/api/bin-data";

// Device configuration
const char* deviceId = "bin-001"; // Change this for each device

// Pin definitions
#define TRIG_PIN 5
#define ECHO_PIN 18
#define ONE_WIRE_BUS 4

// DS18B20 setup
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  sensors.begin();
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

long measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  long distance = duration * 0.034 / 2;
  return distance;
}

void loop() {
  long distance = measureDistance();
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);

  Serial.printf("Device: %s, Distance: %ld cm, Temp: %.2f C\n", deviceId, distance, tempC);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    String payload = String("{\"deviceId\":\"") + deviceId + "\",\"distance\":" + distance + ",\"temp\":" + tempC + "}";
    int httpResponseCode = http.POST(payload);
    Serial.printf("POST %s => %d\n", serverUrl, httpResponseCode);
    http.end();
  }
  delay(60000); // Sleep for 1 minute
} 