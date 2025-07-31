const arduinoModel=require('../model/arduino');

const createArduino=async(req,res)=>{
    const {deviceId,distance,status}=req.body;
    if(!deviceId||!distance||!status){
        return res.status(400).json({message:'All fields are required'});
    }
    
    // Create timestamp in local timezone (East Africa Time - EAT)
    const localTimestamp = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const arduino=await arduinoModel.create({
        deviceId,
        distance,
        status,
        timestamp: new Date(localTimestamp)
    });
    res.status(201).json(arduino);
}

const getArduino = async (req, res) => {
    try {
        const arduino = await arduinoModel.find().sort({ timestamp: -1 }); // Sort by timestamp, descending (latest first)
        res.status(200).json(arduino);
    } catch (err) {
        console.error("Error fetching Arduino data:", err);
        res.status(500).json({ error: "Error fetching data from the server" });
    }
};
module.exports={createArduino,getArduino};