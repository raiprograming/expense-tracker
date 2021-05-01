const express=require("express");
const {createExpanse,updateExpanse,getExpanse,getExpanseByDate}=require("../controllers/Expanse")

const router=express.Router()

router.post("/expanse/get",getExpanse);

router.post("/expanse/create",createExpanse);

router.post("/expanse/update",updateExpanse);

router.post("/expanse/get/date",getExpanseByDate);


module.exports=router;