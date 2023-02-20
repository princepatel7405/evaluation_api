const express=require("express")
const { PostModel } = require("../models/post.model")
const postRoute=express.Router()


postRoute.get("/",async(req,res)=>{
   
    
    try {

        let data=await PostModel.find()
        res.send(data)
    } catch (error) {
        res.send({"mag":"Data Has Not been getted","error":error.message})
        
    }
})

postRoute.get('/top',async(req,res)=>{
    try {
        let data=await PostModel.find().sort({"no_if_comments":-1})
        res.send(data)
    } catch (error) {
        res.send({"mag":"Data Has Not been getted","error":error.message})
        
    }
})





postRoute.post("/post",async(req,res)=>{
    let payload=req.body
    try {
        let data=new PostModel(payload)
        await data.save()
        res.send({"mag":"Data Has Been Posted"})
    } catch (error) {
        res.send({"mag":"Data Has Been Not Posted","error":error.message})
        
    }
})

postRoute.patch("/update/:id",async(req,res)=>{
    let payload=req.body
    let id=req.query.id
    try {
        let data=await PostModel.findByIdAndUpdate(id,payload)
        res.send({"mag":"Data Has Been updated"})
    } catch (error) {
        res.send({"mag":"Data Has  Not Been updated","error":error.message})
        
    }
})
postRoute.delete("/delete/:id",async(req,res)=>{
    let id=req.query.id
    try {
        let data=await PostModel.findByIdAndDelete(id)
        res.send({"mag":"Data Has Been deleted"})
    } catch (error) {
        res.send({"mag":"Data Has  Not Been deleted","error":error.message})
        
    }
})

module.exports={
    postRoute
}