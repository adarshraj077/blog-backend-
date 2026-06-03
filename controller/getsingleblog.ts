import blog from "../models/blogmodel"
async function getsinglePost(req:any,res:any) {
     const singleBlog = await blog.findById(req.params.id);
     res.render("singleblog", {
    blogs: singleBlog
  });
    
}

export default getsinglePost