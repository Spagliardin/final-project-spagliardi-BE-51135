import { generateJTW } from "./../../helpers/jwt";
import { compareSync } from "bcrypt";
import User from "../db/models/user";

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

  public async renewToken(uid: string) {
    const token = await generateJTW(uid);
    const user = await User.findById(uid);

    return {
      token,
      user,
    };
  }
}
