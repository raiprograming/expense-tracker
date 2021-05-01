const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email: {type: String, unique: true, trim: true, index:true, required:true, sparse:true},
    password: {type:String, required:true, sparse:true},
    name: String,
    photo: String,
    mobile_number: Number,
    role :{type :String, default:"user"}
})

module.exports=mongoose.model("User",userSchema);