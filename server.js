const mongoose=require("mongoose");
const express=require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var authRoute =require("./routes/Auth");
var categoryRoute=require("./routes/Category")
var expanseRoute = require("./routes/Expanse");


mongoose.connect("mongodb://localhost:27017/expanse", {
  useNewUrlParser: true,
})
.then(()=>{
    console.log("db connected")
})
.catch(err=>{
    console.log(err);
})


const app=express();

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));
app.use(cookieParser());
app.use(cors());

app.use("/api",authRoute);
app.use("/api", categoryRoute);
app.use("/api", expanseRoute);


app.listen(5000,()=>{
    console.log(`app is running on port 5000`)
});

app.get("/post",(req,res)=>{
    res.json({
        msg:"app running"
    })
})

