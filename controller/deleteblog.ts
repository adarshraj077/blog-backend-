import blog from "../models/blogmodel";


export default async function deleteblog(req:any,res:any){
    await blog.findOneAndDelete({_id:req.params.id}).then(()=>{res.redirect('/blogs/read')})
   
}