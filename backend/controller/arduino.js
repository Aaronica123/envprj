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

const getArduino=async(req,res)=>{
    const arduino=await arduinoModel.find();
    res.status(200).json(arduino);
}
module.exports={createArduino,getArduino};