import { Request, Response } from "express";
import { CartManager } from "./../core/models/cart-manager";

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

export const getCarts = async (req: Request, res: Response) => {
  const carts = await cartManager.getCarts();
  try {
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
  const { cid, pid } = req.params;
  const cartUpdate = await cartManager.addProductToCart(pid, cid);

  try {
    res.json({
      ok: true,
      cartUpdate,
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: error,
    });
  }
};

export const deleteProductToCart = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const cartUpdateWithoutDelete = await cartManager.deleteProductToCart(pid, cid);

  try {
    res.json({
      ok: true,
      cartUpdateWithoutDelete,
    });
  } catch (err) {
    res.status(501).json({
      ok: false,
      msg: await err,
    });
  }
};

export const deleteAllCart = async ( req: Request, res: Response ) => {

  const { cid } = req.params

  const deleteAllCart = await cartManager.deleteAllCart(cid)

  try {
    res.json({
      ok: true,
      msg: deleteAllCart,
    });
  } catch (err) {
    res.status(501).json({
      ok: false,
      msg: await err,
    });
  }
}

export const modifyQuantity = async (req: Request, res: Response ) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  const cartUpdated = await cartManager.modifyQuantity(cid, pid, quantity)

  try {
    res.json({
      ok: true,
      cartUpdated,
    });
  } catch (err) {
    res.status(501).json({
      ok: false,
      msg: await err,
    });
  }
}

