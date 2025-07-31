const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const {Schema}=mongoose;

const add=Schema({
firstname:{
type:String,
required:true
},
lastname:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
,id:{
  type:Number,
  required:true
}

})
add.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
  }
  next();
});
add.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports=mongoose.model('admin',add);