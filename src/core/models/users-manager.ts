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

  public async createUser(bodyUser: UserInterface): Promise<UserInterface | Error>{
    const { email, password } = bodyUser

    
    try {
      const duplicatedEmail = await User.findOne({ email })
      if (duplicatedEmail) throw 'Error with register'

      const user = new User(bodyUser)

      const salt = genSaltSync(10)
      user.password = hashSync(password, salt)

      await user.save()
      return user
    } catch (error) {
      console.error(error)
      throw 'Error with register user'
    }
  }
}