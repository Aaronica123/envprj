// GPS Tracker IoT Firmware for Arduino Uno/Nano
// Features: GPS (NEO-6M), HTTP POST via ESP8266 (AT) or SIM800L (AT)

#include <SoftwareSerial.h>
#include <TinyGPS++.h>

#define GPS_RX 8
#define GPS_TX 9
#define ESP8266_RX 2
#define ESP8266_TX 3

// Device configuration
const char* deviceId = "gps-001"; // Change this for each device

SoftwareSerial gpsSerial(GPS_RX, GPS_TX);
SoftwareSerial esp(ESP8266_RX, ESP8266_TX);
TinyGPSPlus gps;

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  esp.begin(115200);
  // Connect ESP8266 to Wi-Fi (send AT commands)
  esp.println("AT+RST"); delay(2000);
  esp.println("AT+CWMODE=1"); delay(1000);
  esp.println("AT+CWJAP=\"YOUR_WIFI_SSID\",\"YOUR_WIFI_PASSWORD\""); delay(5000);
}

void sendData(double lat, double lng) {
  String payload = String("{\"deviceId\":\"") + deviceId + "\",\"lat\":" + lat + ",\"lng\":" + lng + "}";
  String cmd = "AT+CIPSTART=\"TCP\",\"your-backend.com\",80";
  esp.println(cmd); delay(2000);
  String httpReq = "POST /api/gps-data HTTP/1.1\r\nHost: your-backend.com\r\nContent-Type: application/json\r\nContent-Length: " + String(payload.length()) + "\r\n\r\n" + payload;
  esp.print("AT+CIPSEND="); esp.println(httpReq.length()); delay(1000);
  if (esp.find(">")) {
    esp.print(httpReq);
    delay(2000);
    esp.println("AT+CIPCLOSE");
  }
}

void loop() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }
  if (gps.location.isUpdated()) {
    double lat = gps.location.lat();
    double lng = gps.location.lng();
    Serial.print("Device: "); Serial.print(deviceId); Serial.print(", Lat: "); Serial.print(lat, 6); Serial.print(", Lng: "); Serial.println(lng, 6);
    sendData(lat, lng);
    delay(60000);
  }
} 