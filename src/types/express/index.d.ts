import { UserInterface } from "src/core/interfaces/user.interface";

declare global {
  namespace Express {
    export interface Request {
      uid: string,
      user: UserInterface
    }
  }
}