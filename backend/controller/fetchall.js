const stats=require('../model/hold')

const disp=async (req,res) => {
    const s=await stats.find({})
    if(s){
       return res.status(200).json({
        message:"fetched",
        data:s
    })
    
    }
    else{
        return res.status(350).json({
      
        message:"failed"
    })
    }
    
}
module.exports={disp}