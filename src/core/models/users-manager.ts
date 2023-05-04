import { generateJTW } from './../../helpers/jwt';
import User from "../db/models/user"
import { UserInterface } from "../interfaces/user.interface"
import { genSaltSync, hashSync } from "bcrypt"

export class UserManager {
  constructor() {}

  public async getUsers(): Promise<UserInterface[] | Error> {
    const users = await User.find({}, "name email role google img")
    try {
      return users
    } catch (error) {
      console.error(error);
      throw 'Error with register user'
    }
  }

  public async createUser(bodyUser: UserInterface){
    const { email, password } = bodyUser

    
    try {
      const duplicatedEmail = await this.getUserByEmail(email)
      if (duplicatedEmail) throw 'Error with register'

      const user = new User(bodyUser)

      const salt = genSaltSync(10)
      user.password = hashSync(password, salt)

      await user.save()
      const token = await generateJTW( user.id )
      return {
        user,
        token
      }
    } catch (error) {
      console.error(error)
      throw 'Error with register user'
    }
  }

  private async getUserByEmail(email: string){
    return await User.findOne({
      email,
    });
  }
}