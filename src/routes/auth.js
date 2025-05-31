const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
const {validsignup}=require('../utils/validation');
const userSchema=require("../models/user");
const {userAuth}=require("../Auth");
authRouter.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userSchema.findOne({email:email});
        if(!user){
            throw new Error("invalid credentials");
        }
        const ispasswordvalid=await user.validation(password);
        if(ispasswordvalid){
            const token=await user.getJWT();
            res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
            res.send("login successfully");
        }else{
            throw new Error("invalid credentials");
        }
        
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie('token',{expires:new Date(Date.now())});
});
authRouter.post("/signup",userAuth,async (req,res)=>{
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
});
module.exports=authRouter;