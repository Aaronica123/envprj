const express = require("express"); // Use express instead of Route
const { login } = require("../controller/log");
const { register } = require("../controller/reg");
const{ data1 }=require("../controller/data");
const{fetch}=require("../controller/get")

const router = express.Router(); // Create Router instance
router.get("/fetch",fetch)


router.post("/data",data1)
router.post("/check", login); // Define login route
router.post("/send",register);

module.exports = router; // Export the Router instance directly