# Smart Bin IoT Device

This device detects bin fullness (and optionally temperature) and reports data to the EWCTS backend.

## Features
- Bin fullness detection (ultrasonic sensor)
- Optional temperature monitoring (DS18B20)
- Wi-Fi (ESP32) or GSM (with SIM800L)
- HTTP POST to backend

## Wiring
See `wiring.md` for a detailed diagram.

## Firmware
See `smart_bin.ino` for the Arduino/ESP32 sketch. 