const userAuth=(req,res,next)=>{
    const token="xyzas";
    const isAuthorized=token==="xyz";
    if(isAuthorized){
        // console.log("user is authorized");
        next();
    }
    else{
        res.status(401).send("user is not authorized");
    }
}
module.exports={
    userAuth,
}