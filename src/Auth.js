const jwt=require("jsonwebtoken");
const userSchema=require("./models/user");
const userAuth=async (req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("token is not valid");
    }
    const decoded= jwt.verify(token,"DEV@TINDER79");
    const {_id}=decoded;
    const user=await userSchema.findOne({_id});
    if(!user){
        throw new Error("user is not valid");
    }
    req.user=user;
    next();
}catch(err){
    res.status(400).send("ERROR : "+err.message);
}
}
module.exports={
    userAuth,
}