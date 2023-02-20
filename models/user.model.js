const mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String
})

let UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}