import { compareSync } from "bcrypt"
import User from "../db/models/user"


export class AuthManager {
  constructor() {}


  public async login(bodyLogin: { email: string, password: string }): Promise<void | Error> {
    try {
      const { email, password } = bodyLogin
      const userDB = await User.findOne({ email })

      if(!userDB) throw 'Invalid credentials'

      const validPassword = compareSync( password, userDB.password ) 

      if(!validPassword) throw 'Invalid credentials'

    } catch (error) {
      console.error(error);
      throw 'Error with login'
    }
  }
}