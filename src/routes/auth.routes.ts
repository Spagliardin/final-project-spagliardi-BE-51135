import { validateJWT } from './../middlewares/validate-jwt';
import { login, renewToken } from './../controllers/auth.controller';
import { Router } from "express"


const router: Router = Router()

router.post('/', login)
router.get( '/renew', validateJWT, renewToken )

module.exports = router