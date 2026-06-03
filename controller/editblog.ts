import blog from "../models/blogmodel"


 async function geteditBlog(req:any, res:any){

    const singleBlog = await blog.findById(req.params.id)

    res.render('editBlog', {
        blog: singleBlog
    })
}

async function editblog(req:any,res:any){
    
    const {title,content,author} = req.body
    const user=await blog.findOne({_id:req.params.id})
    if(!user) return res.json({message:"blog not found "})
    await blog.findOneAndUpdate({_id:req.params.id},{
        title,
        content,
        author
    }).then(()=>{
        res.redirect('/blogs/read')
    })
    
}

export default {
    editblog,
    geteditBlog
}