const express=require("express");
const { connection } = require("./config/db");
const { authorize } = require("./middlewares/authorize.middleware");
const { postRoute } = require("./routes/post.routes");
const { userRoute } = require("./routes/user.routes");
require("dotenv").config()
const app= express()
app.use(express.json())

app.use("/users",userRoute)
app.use(authorize)
app.use("/posts",postRoute)
app.listen(8080,async()=>{
try {
    console.log(`Your Server Is Running On ${process.env.PORT}`);
    await connection
    console.log("Database connected Successfully !");
} catch (error) {
    console.log("Database is not connected");
    console.log(error);
}
})