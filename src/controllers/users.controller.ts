import { Request, Response } from "express";
import { UserInterface } from "../core/interfaces/user.interface"
import { UserManager } from "./../core/models/users-manager"



const userManager = new UserManager()

export const createUser = async ( req: Request, res: Response ) => {

  const bodyUser: UserInterface = req.body
  
  try {
    
    const { user, token } = await userManager.createUser(bodyUser)
    res.json({
      ok: true,
      user,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(501).json({
      ok: false,
      msg: 'Error with register user'
    })

  }

}

export const getUsers = async ( req: Request, res: Response ) => {

  try {

    const users = await userManager.getUsers()
    res.json({
      ok: true,
      users
    })

  } catch (error) {
    console.error(error)
    res.status(501).json({
      ok: false,
      msg: "Error get users"
    })
  }

}