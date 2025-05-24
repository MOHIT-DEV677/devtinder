const mongoose = require("mongoose");
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
   },
   password:{
    type:String,
    requried:true,
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