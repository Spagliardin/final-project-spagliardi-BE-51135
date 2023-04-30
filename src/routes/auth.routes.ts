import { login } from './../controllers/auth.controller';
import { Router } from "express"


const router: Router = Router()

router.post('/', login)

module.exports = router