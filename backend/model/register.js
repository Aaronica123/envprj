const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const{Schema}=mongoose

const register= Schema({
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

register.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
  }
  next();
});
register.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports=mongoose.model('reg',register)