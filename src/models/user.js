const mongoose = require("mongoose");
const { isStrongPassword, isURL } = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    firstName:{
    type:String,
    required:true,
    },
   lastName:{
    type:String,
   },
   email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
        if(!isEmail(value)){
            throw new Error("enter the valid email");
        }
    }
   },
   profileurl:{
        type:String,
        default:"https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
        validate(value){
            if(!isURL(value)){
                throw new Error("add the valid url");
            }
        }
   },
   password:{
    type:String,
    requried:true,
    validate(value){
        if(!isStrongPassword(value)){
            throw new Error("password is not strong")
        }
    }
   },
   age:{
    type:Number,
   },
   gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("enter a valid gender");
            
        }
    }
   },
   skills:{
     type:[String],
   }
},{
    timestamps:true,
   },);
   userSchema.index({firstName:1,lastName:-1});
   userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@TINDER79",{expiresIn:"7d"});
    return token;
   }
   userSchema.methods.validation=async function(passwordInputbyUser){
    const user=this;
    const passwordHash=user.password;
    const ispasswordvalid=await bcrypt.compare(passwordInputbyUser,passwordHash);
    return ispasswordvalid;
   }
module.exports=mongoose.model("user",userSchema);