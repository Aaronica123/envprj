const mongoose=require("mongoose")
const{Schema}=mongoose

const data=Schema({
    amount:{
        type:Number,
        required:true
    }
    ,type:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('data',data);

