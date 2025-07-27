const prof=require("../model/register")

const profile1=async(req,res)=>{
    const {username}=req.query;
    const s=await prof.find({
          username: { $regex: `^${username}$`, $options: 'i' }
    })
if(s.length>0){
    return res.status(200).json({
        message:"Found",
        data:s
    })}
    else{
        return res.status(200).json({
        message:"NotFound",
        
    })
    }
}
module.exports={profile1}