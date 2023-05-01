import { NextFunction, Request, Response } from "express";

export const checkApi = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next()
  } else {
    res.status(401).json({
      ok: false,
      msg: 'Unauthorizer'
    })
  }
}