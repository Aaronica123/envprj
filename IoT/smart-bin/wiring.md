# Smart Bin Wiring Diagram

## Components
- ESP32 Dev Board
- Ultrasonic Sensor (HC-SR04)
- (Optional) Temperature Sensor (DS18B20)
- 4.7kΩ resistor (for DS18B20)
- Power supply (USB or battery)

## Pin Connections
| Component      | ESP32 Pin Example |
|---------------|------------------|
| HC-SR04 VCC   | 3.3V             |
| HC-SR04 GND   | GND              |
| HC-SR04 TRIG  | GPIO 5           |
| HC-SR04 ECHO  | GPIO 18          |
| DS18B20 VCC   | 3.3V             |
| DS18B20 GND   | GND              |
| DS18B20 DATA  | GPIO 4           |

- Place a 4.7kΩ resistor between DS18B20 DATA and VCC.

## Mermaid Diagram
```mermaid
graph TD
  ESP32[ESP32 Dev Board]
  HC[HC-SR04 Ultrasonic]
  TEMP[DS18B20 Temp Sensor]
  ESP32 -- 3.3V --> HC
  ESP32 -- GND --> HC
  ESP32 -- GPIO 5 (TRIG) --> HC
  ESP32 -- GPIO 18 (ECHO) --> HC
  ESP32 -- 3.3V --> TEMP
  ESP32 -- GND --> TEMP
  ESP32 -- GPIO 4 (DATA) --> TEMP
  TEMP -- 4.7kΩ --> ESP32
``` 