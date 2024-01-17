const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String,
    },
    username:{
        type:String,
        required:true,
    },
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;