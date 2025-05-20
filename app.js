const express=require('express');
const app=express();
app.use('/hello',(req,res)=>{
    res.send('hello world');
});
app.use('/test',(req,res)=>{
    res.send('hello hello world');
})
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})