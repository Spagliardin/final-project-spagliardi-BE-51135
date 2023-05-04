import { sign } from "jsonwebtoken"

export const generateJTW = ( uid: string ): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    
    const payload = { uid }

    sign( payload, String(process.env.JWT_SECRET), {
      expiresIn: '12h'
    }, (err, token) => {
      if(err) console.log(err)
      err ? reject("can't generate jwt") : resolve( token )
    })
  })
}