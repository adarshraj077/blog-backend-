import { Router } from "express"; 
import handelblogpost from "../controller/postblog";
import getallposts from "../controller/allblogs";
import edit from "../controller/editblog";
import deleteblog from "../controller/deleteblog";
import getsinglePost from '../controller/getsingleblog'
import auth from "../service/auth";
const router = Router();


router.post('/new',handelblogpost)
router.get('/getallpost',getallposts)
router.get('/readOne/:id',getsinglePost)
router.get('/read',getallposts)

router.get('/newblog',auth.restrictToLogedin,(req,res)=>{
    res.render('postblog')
})

router.get('/edit/:id',edit.geteditBlog)
router.post('/edit/:id',edit.editblog)
router.post('/delete/:id',deleteblog)


export default router