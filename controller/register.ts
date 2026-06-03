import User from "../models/user";
const bcrypt = require('bcrypt');

async function register (req:any,res:any){
    const {username ,email,password} = req.body;

    if(!username || !email || !password){
        return res.render('errorPage')
    }
     //encrypting the password 
    const hashed_password=await bcrypt.hash(password,10)
    //checking if already exists 
    const check=await User.findOne({email:email})

    if(check){
        return res.render('errorPage')
    }
    else  {
         await User.create({
        username:username,
        email:email,
        password:hashed_password
    }).then((user)=>{
        res.redirect('/user/login')
    })
        
    }
}


export default register

