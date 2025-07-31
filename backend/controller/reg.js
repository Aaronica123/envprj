//const { use } = require("react");
const reg=require("../model/register");

const register= async (req,res)=>{
    const{firstname,lastname,username,password,id}=req.body
   if(!firstname||!lastname||!username||!password||!id){
    return res.status(400).json({
        message:"must enter data"
    })
   }
   if (!/^[A-Za-z]+$/.test(firstname) || !/^[A-Za-z]+$/.test(lastname) ){
  return res.status(400).json({
    message: "Firstname, lastname, and username must contain only alphabetic characters",
  });
}

const firstn = await reg.findOne({
      id:id
    });
   
    const usern= await reg.findOne({
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





 const newdata= await reg.create({
    firstname,
    lastname,
    username,
    password,
    id
})
res.status(200).json({
    data: newdata,
    message:"Success"
})
}

module.exports={register}