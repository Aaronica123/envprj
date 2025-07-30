const mongoose=require('mongoose');
const {Schema}=mongoose;

const arduinoSchema=new Schema({
    deviceId:{
        type:String,
        required:true,
    },
    distance:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
})
module.exports=mongoose.model('Arduino',arduinoSchema);