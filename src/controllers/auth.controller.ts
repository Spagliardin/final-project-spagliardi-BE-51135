import { AuthManager } from './../core/models/auth-manager';
import { Response, Request } from 'express'


const authManager = new AuthManager()

export const login = async( req: Request, res: Response ) => {

  const { email, password } = req.body
  const bodyLogin = { email, password }
  
  // if(!isAuth) throw 'Error with login'
  
  try {
    await authManager.login(bodyLogin)
    res.json({
      ok: true,
      msg: 'Login Success'
    })
  } catch (error) {
    console.error(error);
    res.status(501).json({
      ok: false,
      msg: 'Error with login'
    })
  }
}