const express = require("express");
const connectDB = require("./config/Database");
const userSchema=require("./models/user");
const app = express();
// const {userAuth}=require('./Auth.js');
app.post("/signup",async (req,res)=>{
    const userObj={
        firstName:"mikasa",
        lastName:"ackerman",
        email:"mikasa@gmail.com",
        password:"mikasa@123",
    }
    const user=new userSchema(userObj);
    try{
    await user.save();
    res.send("data is added successfully");
    }
    catch(err){
        res.status(400).send("error occured :"+err.message);
    }
})
connectDB()
.then(()=>{
    console.log("database connect successfull");
    app.listen(3000, () => {
    console.log("Server running on port 3000");
});
})
.catch((err)=>{
    console.error("database is not connected");
})

