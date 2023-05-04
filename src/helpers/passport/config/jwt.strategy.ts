import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: String(process.env.JWT_SECRET)
}

export const jwtStrategy = new JwtStrategy(opts, (jwtPayload, done) => {
  try {
    return done(null, jwtPayload)
  } catch (error) {
    console.error(error);
    return done(error, false)
  }
})