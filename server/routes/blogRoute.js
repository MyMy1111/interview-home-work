import  express  from "express"

import blogCtrl from "../controllers/blogCtrl.js";

const router = express.Router()


router.get('/blogs', blogCtrl.getBlogs)
router.get('/blog/:id', blogCtrl.getBlog)
router.post('/blogs', blogCtrl.addBlog)

export default router;