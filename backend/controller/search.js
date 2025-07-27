const search=require("../model/coord1");

const sea=async (req,res) => {
    const{long,lat}=req.query;
    if (!long||!lat  ) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude query parameters are required'
      });}

        const latitude = Number(lat);
    const longitude = Number(long);
    const drops = await search.find({
          coordinates: {
            $near: {
              $geometry: {
              type: 'Point',
            coordinates: [longitude, latitude] },
            $maxDistance: 555000
            }
           
          }});
        const nonMatchingDrops = [];
        drops.forEach((e) => {
            if(e.coordinates[0]!==longitude||e.coordinates[1]!==latitude){
                nonMatchingDrops.push(e)
            }
        });
res.status(200).json({
    success: true,
       message: nonMatchingDrops .length > 0 ? 'found' : 'absent',
      count: nonMatchingDrops .length,
      data: nonMatchingDrops 
})
}

module.exports={sea}