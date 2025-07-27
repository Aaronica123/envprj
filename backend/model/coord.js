const mongoose=require('mongoose')
const {Schema}=mongoose;

const cood= new Schema({
    location:
    {
        type:String,
        required:true
    },
    coordinates:{
        type: {
      type: String,
      enum: ['Point'],
      required: true
    },
        coordinates:{
          type:[Number],
          required:true  
        }
    }

});

cood.index({coordinates: "2dsphere"})
module.exports=mongoose.model("d1",cood);