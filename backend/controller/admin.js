const admin=require("../model/admin");

const add=async (req,res) => {
    const{firstname,lastname,username,password}=req.body
     if(!firstname||!lastname||!username||!password){
    return res.status(400).json({
        message:"must enter data"
    })
   }
const firstn = await admin.findOne({
      firstname: { $regex: `^${firstname}$`, $options: 'i' },
      lastname: { $regex: `^${lastname}$`, $options: 'i' }
    });
   
    const usern= await admin.findOne({
      username: { $regex: `^${username}$`, $options: 'i' }
    });
   if(firstn){
    return res.status(600).json({
        message:"Data exists"
    })
   }
   if(usern){
    return res.status(600).json({
        message:"Username exists"
    })
   }
 const newdata= await admin.create({
    firstname,
    lastname,
    username,
    password
})
res.status(200).json({
    data: newdata,
    message:"Success"
})

    
}

module.exports={add}