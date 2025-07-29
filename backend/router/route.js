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
const router = express.Router(); // Create Router instance
router.get("/fetch",fetch)
router.get("/get",take);
router.get("/search",sea)
router.get("/user",profile1);
router.get("/getad",addmin)


router.post("/data",data1)
router.post("/check", login); // Define login route
router.post("/send",register);
router.post("/coord",coordinates)
router.post("/trial",nate)
router.post("/admin",add)
module.exports = router; // Export the Router instance directly