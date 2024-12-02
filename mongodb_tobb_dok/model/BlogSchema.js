const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true}

});

const User=mongoose.model('User',userSchema);

const postSchema=new mongoose.Schema({
    cim:{type:String,required:true},
    tartalom:{type:String,required:true},
    szerzo:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
});

const Post=mongoose.model('Post',postSchema);

module.exports={
    User,
    Post
}