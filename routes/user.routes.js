const express=require("express")
const { UserModel } = require("../models/user.model")
const userRoute=express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//          Registration route

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body

    try {
        let exist_data=await UserModel.find({email})
        if(exist_data){
            res.send("User already exist, please login")
        }
        bcrypt.hash(password,5, async(err, secured_password)=> {
            // Store hash in your password DB.
            let data=new UserModel({name,email,gender,password:secured_password,age,city})
            await data.save()
            res.send({"msg":"Data Saved Successfully"})
            if(err){
                res.send({"msg":"Data Is Not Saved","error":err.message })
            }
        })
    } catch (error) {
        res.send({"msg":"Data Is Not Saved","error":error.message })
    }
})

//          Log in route

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let data=await UserModel.findOne({email})
try {

    bcrypt.compare(password, data.password, async(err, result)=> {
        // result == true
        if(result){

            let data=await UserModel.findOne({email})
            if(data){
                let token = jwt.sign({ "_id":data._id}, 'prince');
                res.send({"msg":"User has been successfully Logged in!","token":token})
            }
            else{
                res.send("User not found")
            }
        }
         else if(err){
            console.log(err);
            res.send("Wrong Cridentials")
        }
    });
} catch (error) {
    res.send({"msg":"User has  Not Logged in!","error":error.message})
}
})

module.exports={
    userRoute
}