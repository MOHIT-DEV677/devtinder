const express=require("express");
const { userAuth } = require("../Auth");
const userRouter=express.Router();
const {conReq}=require("../models/connectionRequest");
const user=require("../models/user");
const USER_SAFE_DATA=["firstName","lastName","profileurl","about"];
userRouter.get("/user/request/received",userAuth,async (req,res)=>{
    try{
    const loggedInuser=req.user;
    const conUser=await conReq.find({
        toUserid:loggedInuser._id,
        status:"interested"
    }).populate("fromUserid",["firstName","lastName"]);
    res.json({
        message:"connection request displayed",
        data:conUser,
    })
}catch(err){
    res.status(400).send("ERROR : "+ err.message);
}
});
userRouter.get("/connection",userAuth,async (req,res)=>{
        const loggedInuser=req.user;
        const requser= await conReq.find({
            $or:[
                {fromUserid:req.user,status:"accepted"},
                {toUserid:loggedInuser,status:"accepted"}
            ]
        }).populate("fromUserid",["firstName","lastName"]).populate("toUserid",["firstName","lastName"]);
        const data=requser.map((val)=>{
            if(val.fromUserid._id.toString()===loggedInuser._id.toString()){
                return val.toUserid;
            }
            return val.fromUserid;
        })
        res.json({
            message:"connection of the user",
            data:data
        });
});
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{

    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) || 10;
    const skip=(page-1)*limit;
    limit=limit>50?50:limit;
    const loggedInuser=req.user;
    const requser=await conReq.find({
        $or:[
            {toUserid:loggedInuser},
            {fromUserid:loggedInuser},
        ]
    }).select("fromUserid toUserid");
    const connect=new Set();
    requser.forEach((val)=>{
        connect.add(val.fromUserid.toString());
        connect.add(val.toUserid.toString());
    });
    const data=await user.find({
        $and:[
            {_id:{$nin:Array.from(connect)}},
            {_id:{$ne:loggedInuser._id}}
        ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.send(data);
}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
})
module.exports=userRouter