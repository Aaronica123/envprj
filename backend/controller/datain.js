const data=require("../model/status")
const locke=require("../model/coord1")
const state1=async (req,res) => {
    const{location,status}=req.body
if(!location||!status){
    return res.status(275).json({
        message:"Must enter data"
    })
}
const sea=await locke.findOne({location})

    if (!sea) {
        return res.status(200).json({
            message: "Failed"
        });
    }
if(status=="empty"||status=="full"||status=="Empty"||status=="Full"){
    
        // Check if location exists in data model
        const existingData = await data.findOne({ location });

        if (existingData) {
            // Update existing entry
            const updatedData = await data.findOneAndUpdate(
                { location },
                { status },
                { new: true } // Return the updated document
            );
            return res.status(200).json({
                message: "Updated",
                data: updatedData
            });
        } else {
            // Create new entry
            const newData = await data.create({
                location,
                status
            });
            return res.status(200).json({
                message: "Created",
                data: newData
            });
        }
    } else {
        console.log("Error in updateStatus:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

   

module.exports={state1}