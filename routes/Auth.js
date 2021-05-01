const express=require("express");
const {signIn,signUp,updateUser} =require("../controllers/User");

const route=express.Router();

route.post("/user/signup",signUp);

route.post("/user/signin",signIn);

route.post("/user/update",updateUser)

module.exports=route;