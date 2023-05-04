import { AuthManager } from "./../core/models/auth-manager";
import { Response, Request } from "express";

const authManager = new AuthManager();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const bodyLogin = { email, password };

  try {
    const { token, userDB } = await authManager.login(bodyLogin);
    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      ok: false,
      msg: "Error with login",
    });
  }
};

export const renewToken = async (req: Request, res: Response) => {
  
  const { uid }: any = req.user
  const { token, user } = await authManager.renewToken(uid);

  try {
    res.json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      msg: "Error with token",
    });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  
  const payload = await authManager.googleSignIn(req.body.token)
  
  try {
    res.json({
      ok: true,
      payload
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      msg: "Error with token",
    });
  }
}
