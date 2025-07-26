const data=require("../model/data")

const data1=async (req,res) => {
    const{amount,type}=req.body

    if(!amount||!type){
        return res.status(600).json({
message:"Please enter all fields"
        })
    }
    const s=Number(amount)
    if(s<0){
        return res.status(700).json({
            message:"Amount must be more than 0"
        })
    }
    
   if(type==="phone"||type==="laptop"||type==="printer"){
 const cr=await data.create({
        amount,
        type
    });
    
    res.status(200).json({
        data:cr,
        message:"Valid"
    })

   }
   else{
     res.status(700).json({
    
        message:"Invalid data"
    })
   }
  
   
}
module.exports={data1}