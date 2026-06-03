import blog from "../models/blogmodel"
async function getallposts(req:any,res:any) {
    const allblogs = await blog.find({}).sort({createdAt:-1})
     res.render("allBlogs", {
    blogs: allblogs
  });
    
}

export default getallposts
