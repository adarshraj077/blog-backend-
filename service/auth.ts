const jwt = require("jsonwebtoken");

const SECRET_KEY =process.env.SECRET_KEY

function restrictToLogedin(req:any,res:any,next:any){
    const token =req.cookies.token;

    if(!token) return res.redirect("/user/login")

    try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();

}catch(err){
    return res.redirect("/user/login")
}

}




export default {
    restrictToLogedin,
    // restrictTO
}