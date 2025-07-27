const coord=require("../model/coord")


const coordinates=async (req,res) => {
  try{
    
    const{location,coordinates}=req.body
  
    if (!location || !coordinates || !coordinates.type || !coordinates.coordinates) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
if (
      !Array.isArray(coordinates.coordinates) ||
      coordinates.coordinates.length !== 2 ||
      typeof coordinates.coordinates[0] !== 'number' ||
      typeof coordinates.coordinates[1] !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        error: 'Coordinates must be an array of two numbers [longitude, latitude]',
      });
    }
    // Validate GeoJSON Point type
    if (coordinates.type !== 'Point') {
      return res.status(400).json({ error: 'Coordinates type must be Point' });
    }
   const existingDoc = await coord.findOne({
    
      coordinates: {
        type: 'Point',
        coordinates: [coordinates.coordinates[0], coordinates.coordinates[1]]
      }
    });
     const locations = await coord.findOne({
      location: { $regex: `^${location}$`, $options: 'i' }
    });
  

    if (existingDoc) {
      return res.status(400).json({
        message: "Data with these coordinates already exists"
      });
    }
    if (locations) {
      return res.status(400).json({
        message: "Name exists"
      });
    }
    else{const newLocation = await coord.create({
      location,
      coordinates: {
        type: coordinates.type,
        coordinates: coordinates.coordinates
      }
    });
    res.status(201).json({
      message: 'Location created successfully',
      data: newLocation
    });}
   
  }catch(error){
    console.log("Failed")
  }
        
}
module.exports={coordinates}