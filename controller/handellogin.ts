import User from "../models/user"

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const SECRET_KEY =process.env.SECRET_KEY

async function handelLogin(req:any,res:any) {
    const {email,password} = req.body;
    //check if email and password is correct
    const user=await User.findOne({email:email})
    if(!user){
         return res.render('errorPage')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
         return res.render('errorPage')
    }else{

        const token =jwt.sign(
              {id: user._id,
    email: user.email,
    username: user.username,
    },
             
             SECRET_KEY,
             
        { expiresIn: "2h" }
        )

        res.cookie('token',token)      
        res.redirect('/blogs/read')
    }
}

export default handelLogin