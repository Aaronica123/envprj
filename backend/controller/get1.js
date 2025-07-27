const get=require("../model/coord1");

const take=async (req,res) => {
    const t=await get.find({});
    return res.status(200).json({
        message:"fetched",
        data:t
    })
    
}

module.exports={take}