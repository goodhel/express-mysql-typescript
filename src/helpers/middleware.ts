import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../config/app.config.json'
import mysql from './database'

class _middleware {
  jwtAuth = () => {
    const { secret } = config.jwt
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: secret
        },
        async (jwtPayload, done) => {
          try {
            const user = await mysql.query(
              `SELECT 
                au.id, 
                au.name, 
                au.email,
                au.password,
                ar.id role_id,
                ar.name role_name
            FROM auth_user au 
            JOIN auth_user_role aur ON aur.user_id = au.id
            JOIN auth_role ar ON ar.id = aur.role_id
            WHERE au.id = ?`,
              [jwtPayload.i]
            )

            if (user.code === 'EMPTY_RESULT') {
              return done(null, false)
            }

            const payload = {
              i: user[0].id,
              n: user[0].name,
              e: user[0].email,
              ri: user[0].role_id,
              rn: user[0].role_name
            }

            return done(null, payload)
          } catch (error) {
            done(error)
          }
        }
      )
    )
  }
}

export default new _middleware()
