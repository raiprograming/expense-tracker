const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const saltRounds=5;
const User= require("../models/User");
const jwt= require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();

exports.signUp=(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let user=new User({
        email:req.body.email,
        password: hash
        });
        user.save((err,obj)=>{
            if(err){
                return res.status(402).json({"error":"could not save user"})
            }
            return res.status(200).json(obj);
        })
    });
}

exports.signIn=(req,res)=>{
    User.findOne({email:req.body.email},(err,usr)=>{
        if(err || !usr){
            return res.status(403).json({error:"user not found"})
        }
        bcrypt.compare(req.body.password,usr.password,(err,result)=>{
            if(result!=true){
                return res.status(404).json({error:"wrong password"})
            }
            jwt.sign({email:usr.email,password:usr.password,role:usr.role},
                process.env.TOKEN_SECRET,
                (err,token)=>{
                    if(err){
                        return res.status(500).json({error:"something went wrong"})
                    }
                    return res.status(200).json({
                        id:usr._id,
                        token:token,
                        role:usr.role?usr.role:"",
                        email:usr.email
                    })
                }
                )
        })
    })
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(req.body.id,{
        ...req.body.user,
    },{new:true},(err,user)=>{
        if(err){
            return res.status(405).json({error:"could not update user"})
        }
        return res.status(200).json(user);
    })
}

