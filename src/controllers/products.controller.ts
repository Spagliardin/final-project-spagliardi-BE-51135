import { Request, Response } from "express";
import Server from "../server/server";

import { ProductManager } from "../core/models/product-manager";
import { SortOrder } from "mongoose";

const productManager = new ProductManager();

export const getProducts = async (req: Request, res: Response) => {

  const { limit, page, sort } = req.query
  let { query } = req.query
  
  if(!query) query = "title description price thumbnail code status category stock"
  
  const { products, total }: any = await productManager.getProducts( sort as SortOrder, String(query), Number(limit), Number(page) );

  res.json({
    ok: true,
    products,
    total
  });
};

export const getProductById = async (req: Request, res: Response) => {

  const pid = req.params.pid;

  try {
    const product = await productManager.getProductByID(pid);

    res.json({
      ok: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: await error,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {

  const body = req.body;

  try {
    const listProducts = await productManager.addProduct(body);

    const payload = { listProducts }
    const server = Server.instance
    server.io.emit( 'products-list', payload )

    res.json({
      ok: true,
      listProducts,
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: await error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const pid = req.params.pid;
  const product = req.body;

  try {
    const updateProduct = await productManager.updateProduct(pid, product);
    res.json({
      ok: true,
      updateProduct,
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: await error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const uid = req.params.pid;

  try {
    const productEliminated = await productManager.deleteProduct(uid);
    res.json({
      ok: true,
      msg: `Todo id ${ productEliminated._id } Deleted successfully`
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: await error,
    });
  }
};
