// Smart Bin IoT Firmware for Arduino Uno/Nano
// Features: Bin fullness (HC-SR04), optional temperature (DS18B20), HTTP POST via ESP8266 (AT) or SIM800L (AT)

#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pin definitions
#define TRIG_PIN 5
#define ECHO_PIN 6
#define ONE_WIRE_BUS 4
#define ESP8266_RX 2
#define ESP8266_TX 3

// Device configuration
const char* deviceId = "bin-001"; // Change this for each device

// DS18B20 setup
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// ESP8266 AT command serial
SoftwareSerial esp(ESP8266_RX, ESP8266_TX);

void setup() {
  Serial.begin(9600);
  esp.begin(115200);
  sensors.begin();
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  // Connect ESP8266 to Wi-Fi (send AT commands)
  esp.println("AT+RST"); delay(2000);
  esp.println("AT+CWMODE=1"); delay(1000);
  esp.println("AT+CWJAP=\"YOUR_WIFI_SSID\",\"YOUR_WIFI_PASSWORD\""); delay(5000);
}

long measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  long distance = duration * 0.034 / 2;
  return distance;
}

void sendData(long distance, float tempC) {
  String payload = String("{\"deviceId\":\"") + deviceId + "\",\"distance\":" + distance + ",\"temp\":" + tempC + "}";
  String cmd = "AT+CIPSTART=\"TCP\",\"your-backend.com\",80";
  esp.println(cmd); delay(2000);
  String httpReq = "POST /api/bin-data HTTP/1.1\r\nHost: your-backend.com\r\nContent-Type: application/json\r\nContent-Length: " + String(payload.length()) + "\r\n\r\n" + payload;
  esp.print("AT+CIPSEND="); esp.println(httpReq.length()); delay(1000);
  if (esp.find(">")) {
    esp.print(httpReq);
    delay(2000);
    esp.println("AT+CIPCLOSE");
  }
}

void loop() {
  long distance = measureDistance();
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  Serial.print("Device: "); Serial.print(deviceId); Serial.print(", Distance: "); Serial.print(distance); Serial.print(" cm, Temp: "); Serial.println(tempC);
  sendData(distance, tempC);
  delay(60000);
} 