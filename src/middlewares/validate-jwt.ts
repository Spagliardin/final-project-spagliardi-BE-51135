import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export const validateJWT = ( req: Request, res: Response, next: NextFunction ) => {

  const token = req.header('x-token')

  if ( !token ) {
    return res.status(401).json({
      ok: false,
      msg: 'Token not found'
    })
  }

  try {

    const { uid } = verify( token, String(process.env.JWT_SECRET) ) as JwtPayload
    req.uid = uid
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Not valid token'
  })
  }

  next();

}