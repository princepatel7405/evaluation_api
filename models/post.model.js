const mongoose=require("mongoose");
let postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:Number,
    userId:String

})

let PostModel=mongoose.model("post",postSchema)

module.exports={
    PostModel
}