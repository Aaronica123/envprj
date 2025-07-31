
const del=require("../model/register")
const del1=require("../model/staff")
const del2=require("../model/admin")


const userdel=async (req,res) => {
const{id}=req.body
if(!id){
     return res.status(500).json({ message: "Enter id" });
}
const st=await del.findOne({
id:id
})
if(st){
      await del.deleteOne({ id: id });

        return res.status(200).json({ message: "Record deleted successfully." });
}
else{
     return res.status(300).json({ message: "Record not found" });
}

    
}

const admindel=async (req,res) => {
const{id}=req.body
if(!id){
     return res.status(500).json({ message: "Enter id" });
}
const st=await del2.findOne({
id:id
})
if(st){
      await del.deleteOne({ id: id });

        return res.status(200).json({ message: "Record deleted successfully." });
}
else{
     return res.status(300).json({ message: "Record not found" });
}

    
}

const staffdel=async (req,res) => {
const{id}=req.body
if(!id){
     return res.status(500).json({ message: "Enter id" });
}
const st=await del1.findOne({
id:id
})
if(st){
      await del.deleteOne({ id: id });

        return res.status(200).json({ message: "Record deleted successfully." });
}
else{
     return res.status(300).json({ message: "Record not found" });
}

    
}

module.exports={userdel,staffdel,admindel}