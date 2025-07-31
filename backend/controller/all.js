const admin=require("../model/admin")
const staff=require("../model/staff")
const register=require("../model/register")


const addmins=async (req,res) => {
    const d=await admin.find({})
    if(d){
       
        return res.status(200).json({
            data:d
        })
        
    }else{
         return res.status(500).json({
           message:"No admins"
        })
    }
}

const users=async (req,res) => {
    const use=await register.find({})
if(use){
      return res.status(200).json({
            data:use
        })
}else{
         return res.status(500).json({
           message:"No users found"
        })
    }
    
}

const stafff=async (req,res) => {
 const st=await staff.find({})
 if(st){
    return res.status(200).json({
            data:st
        })
 }  
 else{
    return res.status(200).json({
           message:"No staff members"
        })
 } 
}

module.exports={addmins,users,stafff}