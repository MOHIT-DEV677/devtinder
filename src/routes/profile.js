const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../Auth");
const userSchema=require("../models/user");
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    res.send(req.user);
});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    const loggedInUser=req.user;
    const ALLOWED_UPD=["age","gender","about","profileurl","skills"];
    Object.keys(req.body).every((key)=>{
        if(ALLOWED_UPD.includes(key)){
            loggedInUser[key]=req.body[key];
        }
    });
    loggedInUser.save();
})
profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    
})
profileRouter.get("/user",async (req,res)=>{
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
});
profileRouter.get("/user/:userid",async (req,res)=>{
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
module.exports=profileRouter;
