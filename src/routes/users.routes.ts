import { Router } from "express"
import { createUser, getUsers } from "../controllers/users.controller"

const router: Router = Router()

router.post('/register', createUser);
router.get('/', getUsers)

module.exports = router