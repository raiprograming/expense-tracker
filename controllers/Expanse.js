const Expanse=require("../models/Expanses")



exports.createExpanse=(req,res)=>{
    let date=req.body.date?req.body.date:""
    if(date==""){
        return res.status(404).json({error:"date not found"})
    }
    let exp=new Expanse(req.body.expanse);
    exp.save((err,obj)=>{
        if(err){
            console.log(err);
            return res.status(404).json({error:"could not update/create expanse"})
        }
        return res.status(200).json(obj)
    })
}

exports.updateExpanse=(req,res)=>{
    let id=req.body.id?req.body.id:"";
    if(id==""){
        return res.status(404).json({error:"no id found"})
    }
    Expanse.findByIdAndUpdate(id,req.body.expanse,{new:true},(err,obj)=>{
        if(err){
            return res.status(500).json({error:"could not update data"})
        }
        return res.status(200).json(obj);
    })
}

exports.getExpanse=(req,res)=>{
    let id=req.body.id?req.body.id:"";
    if (id == "") {
      return res.status(404).json({ error: "no id found" });
    }
    Expanse.find({u_id:id},(err,list)=>{
        if(err){
            return res.status(500).json({ error: "could not get data" });
        }
        return res.status(200).json({data:list})
    })

}

exports.getExpanseByDate=(req,res)=>{
    let id=req.body.id?req.body.id:"";
    let date=req.body.date?req.body.date:"";
    if(id=="" || date==""){
        return res.status(400).json({error:"date and id not found"})
    }
    Expanse.find({u_id:id,date:date},(err,list)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"something went wrong"})
        }
        return res.status(200).json({data:list})
    })
}

