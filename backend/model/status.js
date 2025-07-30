const mongoose=require("mongoose")
const {Schema}=mongoose

const data=Schema({
    location:{
        type:String,
        required:true
    },
    status:{
type:String,
required:true
    }
})
module.exports=mongoose.model("status",data)