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
   profileurl:{
        type:String,
        default:"https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
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