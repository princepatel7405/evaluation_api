const jwt=require("jsonwebtoken");

const authorize=(req,res,next)=>{
let token =req.headers.authorization
    if(token){

        let  decoded = jwt.verify(token, 'prince');
        if(decoded){
            //console.log(decoded);
            req.body.userId=decoded._id
            next()
        }else{
            res.send("You are not authorized")
        }
    }else{
        res.send("You are not audthorized")
    }

}
module.exports={
    authorize
}