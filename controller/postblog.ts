import blog from "../models/blogmodel";

async function handelblogpost(req:any,res:any){
   const {title,content,author}=req.body
    await blog.create({
        title:title,
        content:content,
        author: author
    }).then(()=>{
       res.redirect('/blogs/read')
    })
    console.log("sucess")
}

export default handelblogpost