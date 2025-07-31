
const staff=require("../model/staff")

const create=async (req,res) => {
    const{firstname,lastname,username,password,id}=req.body
    if(!firstname||!lastname||!username||!password||!id){
        return res.status(300).json({
            message:"Please enter all data"
        })
    }
    const firstn = await staff.findOne({
       id:id
        });
    const s=await staff.findOne({username:username})
    if(s||firstn){
        return res.status(400).json({
            message:"Staff is registered"
        })
    }
    else{
        const crea=await staff.create({
            firstname,
            lastname,
            username,
            password,
            id
        })
        return res.status(200).json({
            message:"created",
            data:crea
        })
    }
}
module.exports={create}