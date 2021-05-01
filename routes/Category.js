const express=require("express");
const {createCategory,getCategories,deleteCategory,updateCategory}=require("../controllers/Category")


const router=express.Router();

router.post("/category/create",createCategory);

router.post("/category/update",updateCategory);

router.post("/category/delete",deleteCategory);

router.post("/category/read",getCategories);    

module.exports=router;
