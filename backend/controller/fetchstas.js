const stats=require('../model/hold')
const locations=require('../model/coord1')

const get21=async (req,res) => {
    const{location}=req.query

    if(!location){
        return res.status(200).json({
            message:"enter location"
        })
    }
    let x=0
    let y=0
    let z=0
const ret=await locations.findOne({
    location
})   

const [long, lat] = ret.coordinates.coordinates;
if(ret){
    const retrieve=await stats.find({location})
    if(retrieve){
         retrieve.forEach((e) => {
    
        if(e.type=="Phone"||e.type=="phone"){
            x+=e.amount
        }
        if(e.type=="Printer"||e.type=="printer"){
            y+=e.amount
        }
        if(e.type=="Laptop"||e.type=="laptop"){
            z+=e.amount
        }

    
 
  });
  return res.status(400).json({
    location:location,
    phone:x,
    printer:y,
    laptop:z,
    lat,
    long,
    message:"Valid"
  })

    }
  else{
     return res.status(300).json({
   message:"No data for location"
  })
  }
        
} 
else{
      return res.status(300).json({
   message:"No data for location"
  })
}
 
}

const getAllStats = async (req, res) => {
  try {
    // Aggregate stats by location and type
    const aggregatedStats = await stats.aggregate([
      {
        $match: {
          type: { $in: ["Phone", "phone", "Printer", "printer", "Laptop", "laptop"] }
        }
      },
      {
        $group: {
          _id: "$location",
          phone: {
            $sum: {
              $cond: [
                { $in: ["$type", ["Phone", "phone"]] },
                "$amount",
                0
              ]
            }
          },
          printer: {
            $sum: {
              $cond: [
                { $in: ["$type", ["Printer", "printer"]] },
                "$amount",
                0
              ]
            }
          },
          laptop: {
            $sum: {
              $cond: [
                { $in: ["$type", ["Laptop", "laptop"]] },
                "$amount",
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "cre", // Collection name for locations model
          localField: "_id",
          foreignField: "location",
          as: "locationData"
        }
      },
      {
        $unwind: {
          path: "$locationData",
          preserveNullAndEmptyArrays: true // Include locations without coordinates
        }
      },
      {
        $project: {
          location: "$_id",
          phone: 1,
          printer: 1,
          laptop: 1,
          lat: "$locationData.coordinates.coordinates.1",
          long: "$locationData.coordinates.coordinates.0",
          _id: 0
        }
      }
    ]);

    if (aggregatedStats.length === 0) {
      return res.status(404).json({
        message: "No stats data found"
      });
    }

    return res.status(200).json(aggregatedStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
const getAllStats1 = async (req, res) => {
  try {
    // Get all unique locations from stats
    const uniqueLocations = await stats.distinct("location");
    if (uniqueLocations.length === 0) {
      return res.status(404).json({
        message: "No stats data found",
      });
    }

    // Initialize result array
    const result = [];

    // Process each location
    for (const location of uniqueLocations) {
      let x = 0, y = 0, z = 0;
      const retrieve = await stats.find({ location });
      retrieve.forEach((e) => {
        if (e.type === "Phone" || e.type === "phone") {
          x += e.amount;
        }
        if (e.type === "Printer" || e.type === "printer") {
          y += e.amount;
        }
        if (e.type === "Laptop" || e.type === "laptop") {
          z += e.amount;
        }
      });

      // Get coordinates
      const loc = await locations.findOne({ location });
      let lat = null, long = null;
      if (loc) {
        [long, lat] = loc.coordinates.coordinates;
      }

      result.push({
        location,
        phone: x,
        printer: y,
        laptop: z,
        lat,
        long
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports={get21,getAllStats,getAllStats1}