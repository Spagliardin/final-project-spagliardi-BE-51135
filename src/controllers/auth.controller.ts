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
      userDB,
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
  const { token, user } = await authManager.renewToken(req.uid);

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
