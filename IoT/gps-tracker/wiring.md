# GPS Tracker Wiring Diagram

## Components
- ESP32 Dev Board
- GPS Module (NEO-6M)
- (Optional) GSM Module (SIM800L)
- Power supply (USB or battery)

## Pin Connections
| Component      | ESP32 Pin Example |
|---------------|------------------|
| NEO-6M VCC    | 3.3V/5V          |
| NEO-6M GND    | GND              |
| NEO-6M TX     | GPIO 16 (RX2)    |
| NEO-6M RX     | GPIO 17 (TX2)    |
| SIM800L VCC   | 3.7-4.2V (separate supply) |
| SIM800L GND   | GND              |
| SIM800L TX    | GPIO 26 (RX)     |
| SIM800L RX    | GPIO 27 (TX)     |

## Mermaid Diagram
```mermaid
graph TD
  ESP32[ESP32 Dev Board]
  GPS[NEO-6M GPS]
  GSM[SIM800L GSM]
  ESP32 -- 3.3V/5V --> GPS
  ESP32 -- GND --> GPS
  ESP32 -- GPIO 16 (RX2) <-- GPS
  ESP32 -- GPIO 17 (TX2) --> GPS
  ESP32 -- GND --> GSM
  ESP32 -- GPIO 26 (RX) <-- GSM
  ESP32 -- GPIO 27 (TX) --> GSM
  GSM -- 3.7-4.2V (separate) --> GSM
``` 