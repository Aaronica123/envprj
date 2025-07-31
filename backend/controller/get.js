const get=require("../model/hold");

const fetch=async (req,res) => {
   
let s=0
let y=0
let z=0
    const d=await get.find({})
 
    
    d.forEach((e) => {
if(e.type==="phone"){
    s+=e.amount
}
if(e.type==="laptop"){
    y+=e.amount
}
if(e.type==="printer"){
    z+=e.amount
}
        
    });
    res.status(200).json({
        phone:s,
        laptop:y,
        printer:z,
        message:"Found"
    })
}

module.exports={fetch}