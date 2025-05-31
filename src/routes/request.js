const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../Auth");
const user=require("../models/user");
const {conReq}=require("../models/connectionRequest");
requestRouter.post("/request/send/:status/:toUserid",userAuth,async (req,res)=>{
    try{
        const fromUserid=req.user._id;
    const toUserid=req.params.toUserid;
    const status=req.params.status;
    const touser=await user.findById(toUserid);
    if(!touser){
        throw new Error("requested user is not exists")
    }
    const existingUser=await conReq.findOne({
        $or:[
            {fromUserid,toUserid},
            {fromUserid:toUserid,toUserid:fromUserid}
        ]
    });
    if(existingUser){
        throw new Error("request is already sent");
    }
    const ALLOWED=["interested","ignored"];
    if(!ALLOWED.includes(status)){
        throw new Error("invalid request");
    }
    const requser=new conReq({
        fromUserid,
        toUserid,
        status
    });
    const data=await requser.save();
    res.json({
        message:"request sent successfully",
        data
    })
}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
});
requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try{
    const {status,requestId}=req.params;
    const loggedInuser=req.user;
    const ALLOWED_STATUS=["accepted","rejected"];
    if(!ALLOWED_STATUS.includes(status)){
        throw new Error("status is not allowed");
    }
    const connectionreq=await conReq.findOne({
        _id:requestId,
        toUserid:loggedInuser._id,
        status:"interested"
    });
    if(!connectionreq){
        throw new Error("request is invalid");
    }
    connectionreq.status=status;
    const data=await connectionreq.save();
    res.json({
        message:"connection request is"+status,
        data
    })

}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
});
module.exports=requestRouter;