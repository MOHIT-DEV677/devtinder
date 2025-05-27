const validator=require('validator');
const validsignup=(req)=>{
const {firstName,lastName,email,password}=req.body;
if(!firstName || !lastName){
    throw new Error("enter a valid name");
}
else if(!validator.isEmail(email)){
    throw new Error("enter the valid mail id");
}
else if(!validator.isStrongPassword(password)){
    throw new Error("enter the strong password");
}
}
module.exports={
    validsignup,
}
