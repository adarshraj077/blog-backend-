import { Router } from "express"; 
import handelLogin from "../controller/handellogin";
import register from "../controller/register";

const userRouter = Router();

userRouter.get('/login',(req:any,res:any)=>{
  res.render("login")
})

userRouter.get("/signup",(req:any,res:any)=>{
  res.render("register")
})

userRouter.post('/handellogin',handelLogin)
userRouter.post('/register',register);

export default userRouter
