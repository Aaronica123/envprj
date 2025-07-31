const express = require("express"); // Use express instead of Route
const { login } = require("../controller/log");
const { register } = require("../controller/reg");
const{ data1 }=require("../controller/data");
const{fetch}=require("../controller/get")
const {coordinates}=require("../controller/coont")
const{nate}=require("../controller/coord1")
const{take}=require("../controller/get1")
const{sea}=require("../controller/search")
const{profile1}=require("../controller/profile")
const{add}=require("../controller/admin")
const {addmin}=require("../controller/adminlog")
const{get21,getAllStats,getAllStats1}=require("../controller/fetchstas")
const {st,ret}=require("../controller/stats")
const{disp}=require("../controller/fetchall")
const{create}=require("../controller/staff")
const{staffl}=require("../controller/stafflog")
const{state1}=require("../controller/datain")
const{statue}=require("../controller/datamap")
const{addmins,users,stafff}=require("../controller/all")
const{status1,r}=require("../controller/staffinput")

const router = express.Router(); // Create Router instance
router.get("/fetch",fetch)
router.get("/get",take);
router.get("/search",sea)
router.get("/user",profile1);
router.get('/take',get21);
router.get("/all",disp)
router.get("/getall",getAllStats)
router.get("/getall1",getAllStats1)
router.get("/retrieve",ret)
router.get("/pr",addmins)
router.get("/users",users)
router.get("/staff",stafff)
router.get("/datamap",statue)

router.get("/fetchstatus",r)

router.post("/status",status1)
router.post("/state",state1);
router.post("/st",st)
router.post("/getad",addmin)
router.post("/create",create)
router.post("/staff",staffl)
router.post("/data",data1)
router.post("/check", login); // Define login route
router.post("/send",register);
router.post("/coord",coordinates)
router.post("/trial",nate)
router.post("/admin",add)
module.exports = router; // Export the Router instance directly