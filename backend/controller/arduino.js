const arduinoModel=require('../model/arduino');


   
const createArduino=async(req,res)=>{
    const {deviceId,distance,status}=req.body;
    if(!deviceId||!distance||!status){
        return res.status(400).json({message:'All fields are required'});
    }
    const arduino=await arduinoModel.create({deviceId,distance,status});
    res.status(201).json(arduino);
}

const getArduino=async(req,res)=>{
    const arduino=await arduinoModel.find();
    res.status(200).json(arduino);
}
module.exports={createArduino,getArduino};