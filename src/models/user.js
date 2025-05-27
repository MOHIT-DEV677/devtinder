const mongoose = require("mongoose");
const { isStrongPassword, isURL } = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
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
module.exports=mongoose.model("user",userSchema);