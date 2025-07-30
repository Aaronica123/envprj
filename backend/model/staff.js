const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const {Schema}=mongoose;

const staff=Schema({
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

})
staff.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
  }
  next();
});
staff.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports=mongoose.model('staff',staff);