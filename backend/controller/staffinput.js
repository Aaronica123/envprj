const state=require("../model/staffstatus")
const locke=require("../model/coord1")

const status1=async (req,res) => {
    const{location,status}=req.body;
    if(!location||!status){
        return res.status(300).json({
            message:"Enter all fields"
        })
    }
    const locked=await locke.findOne({
        location
    })
    if(locked){
        if(status=="Working"||status=="working"||status=="Failed"||status=="failed"){
             const r=await state.create({
            location,
            status
        })
        return res.status(250).json({
            message:"saved",
            data:r

        })
        }
        else{
            return res.status(450).json({
            message:"Enter valid status",
           

        })
        }
       
    }
    else{
 return res.status(400).json({
            message:"invalid location",
           

        })
    }
}

const r = async (req, res) => {
    try {
        const d1 = await state.find({}).sort({ _id: -1 }).exec(); // Sort by _id descending (latest first)
        if (d1.length > 0) {
            return res.status(200).json({
                message: "Present data",
                data: d1
            });
        } else {
            return res.status(404).json({
                message: "Lack of data"
            });
        }
    } catch (error) {
        console.error("Error fetching status data:", error);
        return res.status(500).json({
            message: "Failed to fetch data",
            error: error.message
        });
    }
};

module.exports={status1,r}
