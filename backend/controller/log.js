const log=require('../model/register')

const login=async (req,res)=>{
    const{username,password}=req.body
    if(!username||!password){
        return res.status(400).json(
            {
                message:"Enter data"
            }
        )
    }
    const f=await log.findOne({
         username: { $regex: `^${username}$`, $options: 'i' }
    }).select("+password")
    if(f){
        const isMatch = await f.comparePassword(password);
  if (isMatch) {
    console.log("Success");
    return res.status(200).json({ message: "Login successful" });
  } else {
    console.log("False");
    return res.status(401).json({ message: "Invalid password" });
  }
    }
    else {
  return res.status(404).json({ message: "User not found" });
}

}
module.exports={login}