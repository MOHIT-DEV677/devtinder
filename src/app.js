const express = require("express");
const connectDB = require("./config/Database");
const userSchema=require("./models/user");
// const user = require("./models/user");
const app = express();
// const {userAuth}=require('./Auth.js');
app.use(express.json());
app.patch("/user",async (req,res)=>{
    const userid=req.body.userid;
    console.log(userid);
    try{
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
app.post("/signup",async (req,res)=>{
    console.log(req.body);
    const user=new userSchema(req.body);
    try{
    await user.save();
    res.send("data is added successfully");
    }
    catch(err){
        res.status(400).send("error occured :"+err.message);
    }
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

