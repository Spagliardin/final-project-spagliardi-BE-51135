import { CartManager } from "./../core/models/cart-manager";
import { Request, Response } from "express";

const cartManager = new CartManager();

export const createCart = async (req: Request, res: Response) => {
  const cart = req.body;

  try {
    const carts = await cartManager.addCart(cart);
    res.json({
      ok: true,
      carts,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: await error,
    });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const uid = req.params.cid;

  try {
    const cart = await cartManager.getCartById(uid);
    res.json({
      ok: true,
      cart,
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: await error,
    });
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  
  const { cid, pid } = req.params

  const cartUpdate = await cartManager.addProductToCart(pid, cid)

  try {

    res.json({
      ok: true,
      cartUpdate
    })
    
  } catch (error) {
    
    res.status(501)
        .json({
          ok:false,
          msg: error
        })
  }


}
