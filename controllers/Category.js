const category=require("../models/Category");


//create a category for user
exports.createCategory=(req,res)=>{
    let name=req.body.name?req.body.name:"";
    let u_id=req.body.u_id;
    if(name==""){
        return res.status(405).json({error:"user not found or category name not found "})
    }
    let cat=new category({
        name:req.body.name,
        u_id:u_id
    })
    cat.save((err,obj)=>{
        if(err){
            console.log(err);
            return res.status(404).json({error:"category with the same name already exists"});
        }
        return res.status(200).json(obj);
    })
}


//update name of category
exports.updateCategory=(req,res)=>{
    let id=req.body.id?req.body.id:"";
    if(id==""){
        return res.status(405).json({error:"id not found"})
    }
    category.findByIdAndUpdate({_id:id},{name:req.body.name},{new:true},(err,obj)=>{
        if(err){
            return res.status(404).json({error:"could not update category"})
        }
        return res.status(200).json({obj});
    })
}


//delete a category of user
exports.deleteCategory=(req,res)=>{
    let id=req.body.id?req.body.id:""
    if(id==""){
        return res.status(405).json({error:"id not found"})
    }
    category.findByIdAndDelete(req.body.id,(err,obj)=>{
        if(err){
            return res.status(500).json({error:"could not delete category"})
        }
        return res.status(200).json(obj)
    })
}


//return all categories for a user
exports.getCategories=(req,res)=>{
    let user=req.body.u_id?req.body.u_id:"";
    if(user==""){
        return res.status(404).json({error:"user id not found"})
    }
    category.find({u_id:user},(err,objs)=>{
        if(err){
            return res.status(404).json({error:"no category found"})
        }
        return res.status(200).json(objs);
    })
}