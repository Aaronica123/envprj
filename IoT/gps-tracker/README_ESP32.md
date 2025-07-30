# ESP32 IoT Device with Ultrasonic Sensor

This firmware is designed for the Wemos Lolin Lite ESP32 with an HC-SR04 ultrasonic sensor to monitor bin fullness levels and send data to the existing backend.

## Features

- **Distance Measurement**: Uses HC-SR04 ultrasonic sensor to measure distance
- **Wi-Fi Connectivity**: Connects to Wi-Fi network for data transmission
- **HTTP POST**: Sends data to existing backend endpoints
- **Status Classification**: Automatically determines bin status (empty/partial/full)
- **Configurable**: Easy to configure device ID, location, and thresholds

## Hardware Requirements

- Wemos Lolin Lite ESP32
- HC-SR04 Ultrasonic Sensor
- USB cable for programming and power
- (Optional) External power supply

## Software Requirements

- Arduino IDE with ESP32 board support
- Required libraries:
  - WiFi.h (built-in)
  - HTTPClient.h (built-in)
  - ArduinoJson.h (install via Library Manager)

## Installation

1. **Install ESP32 Board Support**:
   - Open Arduino IDE
   - Go to File > Preferences
   - Add `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json` to Additional Board Manager URLs
   - Go to Tools > Board > Boards Manager
   - Search for "ESP32" and install "ESP32 by Espressif Systems"

2. **Install Required Libraries**:
   - Go to Tools > Manage Libraries
   - Search for "ArduinoJson" and install the library by Benoit Blanchon

3. **Configure the Device**:
   - Open `gps_tracker_esp32.ino`
   - Update Wi-Fi credentials:
     ```cpp
     const char* ssid = "YOUR_WIFI_SSID";
     const char* password = "YOUR_WIFI_PASSWORD";
     ```
   - Update device configuration:
     ```cpp
     const char* deviceId = "iot-device-001"; // Change for each device
     const char* deviceLocation = "Location-A"; // Change for each device
     ```
   - Update backend URL if needed:
     ```cpp
     const char* serverUrl = "http://localhost:3000/api/state";
     ```

4. **Upload the Code**:
   - Select "Wemos Lolin Lite" from Tools > Board
   - Connect ESP32 via USB
   - Select the correct COM port
   - Click Upload

## Wiring

Follow the wiring diagram in `wiring_esp32.md`:

- HC-SR04 VCC → ESP32 3.3V
- HC-SR04 GND → ESP32 GND  
- HC-SR04 TRIG → ESP32 GPIO 5
- HC-SR04 ECHO → ESP32 GPIO 18

## Configuration

### Distance Thresholds
The device uses these thresholds to determine bin status:

```cpp
#define EMPTY_THRESHOLD 20  // Distance when bin is empty (cm)
#define FULL_THRESHOLD 5    // Distance when bin is full (cm)
```

- **Empty**: Distance ≥ 20cm
- **Partial**: Distance between 5-20cm  
- **Full**: Distance ≤ 5cm

### Data Format
The device sends data to the backend in this format:
```json
{
  "location": "Location-A",
  "status": "full|empty|partial"
}
```

This matches the existing backend endpoint `/api/state` which expects `location` and `status` fields.

## Operation

1. **Power On**: Connect the ESP32 to power via USB or external supply
2. **Wi-Fi Connection**: The device will automatically connect to the configured Wi-Fi network
3. **Data Collection**: Every 60 seconds, the device:
   - Measures distance using the ultrasonic sensor
   - Determines bin status based on distance
   - Sends data to the backend
   - Prints debug information to Serial Monitor

## Debugging

Open the Serial Monitor (Tools > Serial Monitor) to see:
- Wi-Fi connection status
- Distance measurements
- Status determinations
- HTTP response codes
- Error messages

## Troubleshooting

### Common Issues

1. **Wi-Fi Connection Failed**:
   - Check SSID and password
   - Ensure Wi-Fi network is 2.4GHz (ESP32 doesn't support 5GHz)
   - Check signal strength

2. **HTTP POST Failed**:
   - Verify backend server is running
   - Check server URL is correct
   - Ensure network connectivity

3. **Incorrect Distance Readings**:
   - Check wiring connections
   - Ensure sensor is properly mounted
   - Adjust distance thresholds if needed

4. **Compilation Errors**:
   - Ensure ESP32 board support is installed
   - Install required libraries
   - Check Arduino IDE version compatibility

## Backend Integration

The device sends data to the existing `/api/state` endpoint with:
- `location`: Device location identifier
- `status`: Bin status (full/empty/partial)

The backend will:
- Create new entries for new locations
- Update existing entries for known locations
- Return success/error responses

## Multiple Devices

To deploy multiple devices:

1. **Unique Device IDs**: Change `deviceId` for each device
2. **Unique Locations**: Change `deviceLocation` for each device
3. **Same Backend**: All devices can use the same backend URL
4. **Network**: Ensure all devices can reach the backend server

## Power Management

For battery-powered operation:
- Use external power supply (5V recommended)
- Consider adding deep sleep functionality for longer battery life
- Monitor power consumption during development

## Security Considerations

- Change default Wi-Fi credentials
- Use HTTPS for production deployments
- Consider adding authentication tokens
- Secure physical access to devices 