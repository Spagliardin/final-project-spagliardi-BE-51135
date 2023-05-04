import passport from 'passport'
import { jwtStrategy } from './config/jwt.strategy'

passport.use(jwtStrategy);
