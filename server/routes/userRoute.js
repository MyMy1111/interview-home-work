import  express  from "express"

import userCtrl from "../controllers/userCtrl.js";

const router = express.Router()


router.post('/users', userCtrl.register)

export default router;