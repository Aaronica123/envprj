const coord=require("../model/coord1");
const s=require("../model/hold");


const nate=async (req,res) => {
    const{location, coordinates}=req.body
    if(!location||!coordinates){
        return res.status(400).json({
            message:"Enter all fileds"
        })
    }
    //coordinates.coordinates [the second coordinates is a key word that stores in form of longtitude then latitude]
    if(coordinates.coordinates[1]>=90||coordinates.coordinates[1]<-90)
    {
        return res.status(300).json({
            message:"Data is incorrect"
        })
    }
    if(coordinates.coordinates[0]>181||coordinates.coordinates[0]<-181)
    {
        return res.status(300).json({
            message:"Data 1 is incorrect"
        })
    }
const ch=await coord.findOne({
    location: { $regex: `^${location}$`, $options: 'i' }
})
const loc=await coord.findOne({
     coordinates: {
        type: 'Point',
        coordinates: [coordinates.coordinates[0], coordinates.coordinates[1]]
      }
})
if(loc){
    return res.status(700).json({
        message:"Coordinates are in use"
    })
}
if(ch){
    return res.status(700).json({
        message:"Location name used"
    })
}

    const data=await coord.create({
        location,
      coordinates: {
        type: coordinates.type,
        coordinates: coordinates.coordinates
      }
    })
    res.status(200).json({
        message:"Sent",
        data:data
    })
}

const search=async (req,res) => {
    const {location}=req.body
    if(!location){
        return res.status(350).json({
            message:"Enter location"
        })
    }
    
    
}
module.exports={nate}