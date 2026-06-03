require("dotenv").config()
import express from "express"
import connectdb from "./connection"

import middelware from "./middelware"
import router from "./routes/blog"

import userRouter from "./routes/user"

const app=express()
const path=require('path')
const PORT=process.env.PORT 


middelware(app)
connectdb()

app.set("view engine",'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use('/blogs',router)
app.use('/user',userRouter)



app.listen(PORT,()=>{
    console.log(`app is listning on ${PORT} `)
})
