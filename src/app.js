const express = require("express");
const connectDB = require("./config/Database");
const app = express();
const cookieparser=require('cookie-parser');
const cors=require("cors");
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieparser());
const authRouter=require("./routes/auth");
const requestRouter=require("./routes/request");
const profileRouter=require("./routes/profile");
const userRouter=require("./routes/user");
app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
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

