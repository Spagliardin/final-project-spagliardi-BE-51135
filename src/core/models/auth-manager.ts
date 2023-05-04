import { TokenPayload } from 'google-auth-library';
import { googleVerify } from './../../helpers/google-verify';
import { generateJTW } from "./../../helpers/jwt";
import { compareSync } from "bcrypt";
import User from "../db/models/user";
import { TokenPayloadGoogle } from '../interfaces/auth.interface';


export class AuthManager {
  constructor() {}

  public async login(bodyLogin: {
    email: string;
    password: string;
  }): Promise<any | Error> {
    try {
      const { email, password } = bodyLogin;
      const userDB = await User.findOne({ email });

      if (!userDB) throw "Invalid credentials";

      const validPassword = compareSync(password, userDB.password);

      if (!validPassword) throw "Invalid credentials";

      const token = await generateJTW(userDB.id);

      return {
        userDB,
        token,
      };
    } catch (error) {
      console.error(error);
      throw "Error with login";
    }
  }

  public async renewToken(uid: string | undefined) {
    if (!uid) throw "can't generate jwt"
    const token = await generateJTW(uid);
    const user = await User.findById(uid);

    return {
      token,
      user,
    };
  }

  public async googleSignIn(token: string): Promise<any>{

    const googleUser = await googleVerify(token)
    if (!googleUser) throw 'Error with token google'

    const { email, name, picture } = googleUser
    const user = await User.findOne({ email })
    let currentUser;

    if (!user) {
      currentUser = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      currentUser = user
      currentUser.google = true
    }

    await currentUser.save()
    const jwToken = await generateJTW(currentUser.id);

    if( !jwToken ) throw 'Error with token'

    return {
      email, name, picture, token: jwToken
    }
  }
}
