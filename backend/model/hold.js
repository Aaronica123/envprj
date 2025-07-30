const mongoose=require("mongoose")
const{Schema}=mongoose

const stats=Schema({
     amount:{
        type:Number,
        required:true
    }
    ,type:{
        type:String,
        required:true
    }
    ,location:{
        type:String,
        required:true
    }
  
    
})

module.exports=mongoose.model("stats",stats)
