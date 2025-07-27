const mongoose=require('mongoose')
const{Schema}=mongoose;

const cre=Schema({
    location:{
        type:String,
        required:true
    }
    ,coordinates:{
type:{
    type:String,
    enum:['Point'],
    required:true
},
coordinates:{
    type:[Number],
    required:true
}
    }
})

cre.index({coordinates:"2dsphere"})

module.exports=mongoose.model("cre",cre);