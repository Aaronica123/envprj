# MongoDB Database Setup for IoT Project

## Database Connection URL
Your MongoDB Atlas connection URL:
```
mongodb+srv://kaaronmutua:Aaronica@cluster0.uczsevp.mongodb.net/ENV?retryWrites=true&w=majority&appName=Cluster0
```

## Backend Configuration

### 1. Create .env file in backend directory
Create a file named `.env` in the `backend/` directory with the following content:

```env
MONGODB=mongodb+srv://kaaronmutua:Aaronica@cluster0.uczsevp.mongodb.net/ENV?retryWrites=true&w=majority&appName=Cluster0
```

### 2. Install dotenv package (if not already installed)
```bash
cd backend
npm install dotenv
```

### 3. Verify backend connection
Start your backend server:
```bash
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:3000
Connected to MongoDB
Database connected successfully
```

## ESP32 Configuration

### 1. Update backend URL in ESP32 code
In `gps_tracker_esp32.ino`, update the server URL:

**For local development (ESP32 and backend on same network):**
```cpp
const char* serverUrl = "http://YOUR_COMPUTER_IP:3000/api/state";
```

**To find your computer's IP address:**
- Windows: Run `ipconfig` in Command Prompt
- Mac/Linux: Run `ifconfig` in Terminal
- Look for your local IP (usually starts with 192.168.x.x or 10.0.x.x)

### 2. Example configuration:
```cpp
// If your computer's IP is 192.168.1.100
const char* serverUrl = "http://192.168.1.100:3000/api/state";
```

## Database Collections

Your MongoDB database should have these collections:

### 1. `coord1` collection (for location coordinates)
```javascript
{
  "location": "Location-A",
  "coordinates": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  }
}
```

### 2. `status` collection (for IoT device data)
```javascript
{
  "location": "Location-A",
  "status": "full|empty|partial"
}
```

## Adding Locations to Database

Before the ESP32 can send data, you need to add the location to the `coord1` collection:

### Using MongoDB Compass or Atlas:
1. Connect to your MongoDB Atlas cluster
2. Navigate to the `ENV` database
3. Go to the `coord1` collection
4. Add a document:
```json
{
  "location": "Location-A",
  "coordinates": {
    "type": "Point",
    "coordinates": [your_longitude, your_latitude]
  }
}
```

### Using your backend API:
You can also add locations through your existing backend endpoints.

## Testing the Connection

### 1. Test backend connection:
```bash
curl -X POST http://localhost:3000/api/state \
  -H "Content-Type: application/json" \
  -d '{"location":"Location-A","status":"test"}'
```

### 2. Test ESP32 connection:
- Upload the ESP32 code
- Open Serial Monitor
- Check for "Database connection successful" message

## Troubleshooting

### Backend Connection Issues:
- Verify `.env` file exists in backend directory
- Check MongoDB Atlas network access (IP whitelist)
- Ensure backend server is running

### ESP32 Connection Issues:
- Verify Wi-Fi credentials
- Check if backend URL uses correct IP address
- Ensure ESP32 and backend are on same network
- Check firewall settings

### Database Issues:
- Verify location exists in `coord1` collection
- Check MongoDB Atlas connection string
- Ensure database and collections exist

## Security Notes

⚠️ **Important Security Considerations:**
- The MongoDB URL contains credentials - keep it secure
- Consider using environment variables in production
- Add IP whitelisting in MongoDB Atlas
- Use HTTPS in production environments 