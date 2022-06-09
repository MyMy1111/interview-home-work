import  express  from "express"

import commentCtrl from "../controllers/commentCtrl.js";

const router = express.Router()


router.post('/comments', commentCtrl.addComment)
router.get('/comments/blog/:id', commentCtrl.getComments)

export default router;