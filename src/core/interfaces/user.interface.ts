import { Document } from "mongoose"

export interface UserInterface extends Document {
  name: string,
  email: string,
  password: string,
  google: boolean,
  role: string,
  img?: string,
}