import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from "express"
import { createUser, getUsers } from "../controllers/users.controller"

const router: Router = Router()

router.post('/register',createUser);
router.get('/', validateJWT ,getUsers)

module.exports = router