import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client( process.env.GOOGLE_SECRET );

export const googleVerify = async( token: string ) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  
  if(!payload) return null

  return payload
}