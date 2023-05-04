import { login, renewToken, googleSignIn } from './../controllers/auth.controller';
import { Router } from "express"
import passport from 'passport';


const router: Router = Router()

router.post('/', login)
router.get( '/renew', passport.authenticate('jwt', {session: false}), renewToken )
router.post( '/google', googleSignIn)


module.exports = router