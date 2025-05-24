const mongoose=require('mongoose');
const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://project1:Mohitraj@cluster2.mme6f.mongodb.net/Devtinder');
}
module.exports=connectDB;
