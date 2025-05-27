const express = require("express");
const connectDB = require("./config/Database");
const userSchema=require("./models/user");
const {validsignup}=require('./utils/validation');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const app = express();
const cookieparser=require('cookie-parser');
const {userAuth}=require("./Auth");
app.use(express.json());
app.use(cookieparser());
app.patch("/user/:userid",async (req,res)=>{
    const userid=req.params?.userid;
    const data=req.body;
    console.log(userid);
    try{
      const ALLOWED_UPDATES=["userid","profileurl","skills","lastName","gender"];
      const isallowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
      if(!isallowed){
        throw new Error("updates is not allowed");
      }
    const users= await userSchema.findOneAndUpdate({_id:userid},req.body,{runValidators:true});
    
    if(!users){
        res.status(401).send("user is not found");
    }
    else{
        res.send("user updated successfully");
    }
    }catch(err){
        res.send("something went wrong"+ err.message);
    }
})
app.post("/login",async (req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await userSchema.findOne({email:email});
    if(!user){
        throw new Error("invalid credentials");
    }
    const word=await bcrypt.compare(password,user.password);
    if(word){
        const token=await jwt.sign({_id:user._id},"DEV@TINDER79",{expiresIn:"7d"});
        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
        res.send("login successfully");
    }else{
        throw new Error("invalid credentials");
    }
    
}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
})
app.get("/user",async (req,res)=>{
    const emailid=req.body.email;
    console.log(emailid);
    try{
        const users=await userSchema.findOne();
        if(!users){
            res.status(401).send("user is not found");
        }
        else{
        res.send(users);
        }
    }catch(err){
        res.status(400).send("something is went wrong");
    }
    
})
app.get("/profile",userAuth,async (req,res)=>{
    res.send(req.user);
})
app.post("/signup",async (req,res)=>{
    try{
    validsignup(req);
    const {firstName,lastName,email,password}=req.body;
    const passwordhash=await bcrypt.hash(password,10);
    console.log(req.body);
    const user=new userSchema({
        firstName,lastName,password:passwordhash,email,
    });
    await user.save();
    res.send("data is added successfully");
    }
    catch(err){
        res.status(400).send("error occured :"+err.message);
    }
})
app.post("/sendrequestconnection",userAuth,async (req,res)=>{
    res.send("connection request send");
})
connectDB()
.then(()=>{
    console.log("database connect successfull");
    app.listen(3000, () => {
    console.log("Server running on port 3000");
});
})
.catch((err)=>{
    console.error("database is not connected");
})

