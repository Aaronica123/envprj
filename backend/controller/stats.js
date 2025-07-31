const item=require("../model/data");
const coordinates=require("../model/coord1");
const stats=require("../model/hold")

const st=async (req,res) => {
const{ type, amount,location}=req.body
if(!location){
    return res.status(300).json({
        message:"Enter every data"
    })
}    
const f=await coordinates.findOne({
    location
   })
if(f){
    
    const r=await stats.create({
        
        amount,type,
        location
      

    })
    return res.status(200).json({
        r,
        message:"Valid"
    })
}else
{
    return res.status(400).json({
        message:"inValid"
    })
}


}
const ret=async (req,res) => {
    const d=stats.find({})
 let x=0,y=0,z=0
d.forEach((e) => {
    if(e.type=="phone"){
        x+=e.amount
    }
     if(e.type=="laptop"){
        y+=e.amount
    }
     if(e.type=="printer"){
        z+=e.amount
    }
});
return res.status
}
module.exports={st,ret}