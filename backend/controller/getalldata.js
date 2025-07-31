const get=require("../model/register")
const ret=require("../model/admin")
const add=require("../model/staff")

const getusers=async (req,res) => {
    
    const d=await get.find({})
    if(d){
return res.status(200).json({
    message:"Done",
    data:d
})
    }
    else{
        return res.status(250).json({
    message:"Not found"
})
    }
}
const getadmin=async (req,res) => {
    
    const d=await ret.find({})
    if(d){
return res.status(200).json({
    message:"Done",
    data:d
})
    }
    else{
        return res.status(250).json({
    message:"Not found"
})
    }
}

const getstaff=async (req,res) => {
    
    const d=await add.find({})
    if(d){
return res.status(200).json({
    message:"Done",
    data:d
})
    }
    else{
        return res.status(250).json({
    message:"Not found"
})
    }
}
module.exports={getusers,getstaff,getadmin}