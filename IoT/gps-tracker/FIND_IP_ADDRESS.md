# Find Your Computer's IP Address

## The Problem
Your ESP32 is getting error `-1` because it's trying to connect to `localhost:3000`, but ESP32 devices cannot reach `localhost` - they need your computer's actual network IP address.

## How to Find Your IP Address

### Windows:
1. Open Command Prompt (cmd)
2. Type: `ipconfig`
3. Look for your network adapter (usually "Wi-Fi" or "Ethernet")
4. Find the "IPv4 Address" - it will look like `192.168.1.XXX`

### Mac:
1. Open Terminal
2. Type: `ifconfig`
3. Look for `inet` followed by your IP address

### Linux:
1. Open Terminal
2. Type: `ip addr` or `ifconfig`
3. Look for your network interface IP

## Update ESP32 Code

Replace the placeholder in your ESP32 code:

```cpp
// Change this line in gps_tracker_esp32.ino:
const char* serverUrl = "http://192.168.1.XXX:3000/api/createarduino";

// Replace XXX with your actual IP address
// Example: if your IP is 192.168.1.105, use:
const char* serverUrl = "http://192.168.1.105:3000/api/createarduino";
```

## Test Your Backend

Before uploading to ESP32, test if your backend is accessible:

1. **Start your backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Test the endpoint in browser:**
   - Go to: `http://YOUR_IP:3000/api/createarduino`
   - Example: `http://192.168.1.105:3000/api/createarduino`

3. **Test with curl:**
   ```bash
   curl -X POST http://YOUR_IP:3000/api/createarduino \
     -H "Content-Type: application/json" \
     -d '{"deviceId":"test","distance":10.5,"status":"test"}'
   ```

## Common IP Address Ranges

- **192.168.1.XXX** (most common)
- **192.168.0.XXX**
- **10.0.0.XXX**
- **172.16.0.XXX**

## Troubleshooting

### If you still get error -1:
1. **Check if backend is running** on port 3000
2. **Check firewall settings** - allow port 3000
3. **Verify ESP32 and computer are on same network**
4. **Try pinging your computer's IP** from another device

### If you get different errors:
- **Error 404**: Endpoint doesn't exist - check if `/api/createarduino` exists
- **Error 500**: Backend server error - check backend logs
- **Connection timeout**: Network connectivity issue

## Quick Test

After updating the IP address, upload the code and check the Serial Monitor. You should see:
```
✓ Database connection successful
📊 Sending to database: {"deviceId":"iot-device-001","distance":15.50,"status":"partial"}
✅ New record created in database
``` 