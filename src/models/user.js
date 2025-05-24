const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
   secondName:{
    type:String,
   },
   email:{
    type:String,
   },
   password:{
    type:String,
   },
   age:{
    type:Number,
   },
});
module.exports=mongoose.model("user",userSchema);