import passport from 'passport';
import { Router } from "express"
import { createUser, getUsers } from "../controllers/users.controller"

const router: Router = Router()

router.post('/register',createUser);
router.get('/', passport.authenticate('jwt', {session: false}) ,getUsers)

module.exports = router