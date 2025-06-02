const mongoose=require("mongoose");
const connectionReqMod=new mongoose.Schema({
    toUserid:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    fromUserid:{
        ref:"user",
        type:mongoose.Schema.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{values} is not exists`
        }
    },
},{
    timestamps:true
});
connectionReqMod.pre('save',function(){
    const user=this;
    if(user.fromUserid.equals(user.toUserid)){
        throw new Error("cannot send the request to same username");
    }
    // next();
});
const conReq=mongoose.model('connectionRequest',connectionReqMod);
module.exports={
    conReq,
}