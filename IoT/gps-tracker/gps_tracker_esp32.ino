// IoT Device Firmware for Wemos Lolin Lite ESP32 with Ultrasonic Sensor
// Features: Distance measurement (HC-SR04), Wi-Fi, HTTP POST to database via backend API

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <time.h>

// Wi-Fi credentials
const char* ssid = "GG";
const char* password = "1234567880";

// Backend endpoint - sends data directly to database via /api/createarduino endpoint
const char* serverUrl = "http://192.168.30.27:3000/api/createarduino"; // Replace XXX with your actual IP

// Device configuration for database storage
const char* deviceId = "iot-device-001"; // Change this for each device

// Pin definitions for ultrasonic sensor
#define TRIG_PIN 5
#define ECHO_PIN 18

// Distance thresholds (in cm)
#define EMPTY_THRESHOLD 20
#define FULL_THRESHOLD 5

void setup() {
  Serial.begin(115200);
  
  // Initialize ultrasonic sensor pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  // Configure local time (East Africa Time - EAT)
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov"); // UTC+3 for EAT
  Serial.println("Waiting for NTP time sync...");
  time_t now = 0;
  while (now < 24 * 3600) {
    delay(100);
    now = time(nullptr);
  }
  Serial.println("Time synchronized");
  
  // Test database connectivity
  Serial.println("Testing database connectivity...");
  testDatabaseConnection();
}

bool testDatabaseConnection() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Send a test payload
    String testPayload = "{\"deviceId\":\"" + String(deviceId) + "\",\"distance\":0.0,\"status\":\"test\"}";
    int httpResponseCode = http.POST(testPayload);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("✓ Database connection successful");
    } else {
      Serial.printf("❌ Database connection failed: %d\n", httpResponseCode);
    }
    
    http.end();
    return (httpResponseCode > 0);
  }
  return false;
}

float measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  float duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  float distance = duration * 0.034 / 2;
  
  return distance;
}

String determineStatus(float distance) {
  if (distance <= FULL_THRESHOLD) {
    return "full";
  } else if (distance >= EMPTY_THRESHOLD) {
    return "empty";
  } else {
    return "partial";
  }
}

void sendDataToDatabase(String deviceId, float distance, String status) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Get current local time
    time_t now = time(nullptr);
    struct tm* timeinfo = localtime(&now);
    char timeString[64];
    strftime(timeString, sizeof(timeString), "%Y-%m-%d %H:%M:%S", timeinfo);
    
    // Create JSON payload for database storage
    // Format: {deviceId: String, distance: float, status: String}
    String payload = "{\"deviceId\":\"" + deviceId + "\",\"distance\":" + String(distance, 2) + ",\"status\":\"" + status + "\"}";
    
    Serial.printf("📊 Sending to database: %s\n", payload.c_str());
    Serial.printf("🕒 Local Time: %s\n", timeString);
    Serial.printf("⏱️ Uptime: %lu ms\n", millis());
    
    int httpResponseCode = http.POST(payload);
    Serial.printf("🗄️ Database POST %s => %d\n", serverUrl, httpResponseCode);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("📥 Database Response: " + response);
      
      // Parse response to check if data was stored successfully
      if (httpResponseCode == 201 || httpResponseCode == 200) {
        if (response.indexOf("_id") != -1) {
          Serial.println("✅ Data successfully stored in database");
          Serial.println("   Record ID: " + response.substring(response.indexOf("\"_id\":\"") + 7, response.indexOf("\",\"timestamp\"")));
        } else {
          Serial.println("✅ Data sent to database successfully");
        }
      } else {
        Serial.println("⚠️ Database storage may have failed");
      }
    } else {
      Serial.printf("❌ Database POST failed with error: %d\n", httpResponseCode);
      Serial.println("   Check if backend server is running on: " + String(serverUrl));
    }
    
    http.end();
  } else {
    Serial.println("❌ WiFi not connected - cannot send to database");
    Serial.println("   Reconnecting to WiFi...");
    WiFi.reconnect();
  }
}

void loop() {
  float distance = measureDistance();
  String status = determineStatus(distance);
  
  // Print debug information
  Serial.printf("Device: %s, Distance: %.2f cm, Status: %s\n", 
                deviceId, distance, status.c_str());
  
  // Send data directly to database via backend API
  sendDataToDatabase(deviceId, distance, status);
  
  // Wait for 1 minute before next reading
  delay(60000);
} 