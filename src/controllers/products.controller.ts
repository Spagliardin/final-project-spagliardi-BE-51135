import { Request, Response } from "express";
import Server from "../server/server";
import { ProductManager } from "../core/models/product-manager";

const productManager = new ProductManager();

export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await productManager.getProducts();

  res.json({
    ok: true,
    products: listProducts,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const uid = req.params.pid;

  try {
    const product = await productManager.getProductByID(uid);

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

  // localhost:8080/api/products/1gqv6lhj70a7df5f3e9a683
};

export const createProduct = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const listProducts = await productManager.addProduct(body);

    const payload = {
      listProducts
    }
  
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
  const uid = req.params.pid;
  const product = req.body;

  try {
    const updateProduct = await productManager.updateProduct(uid, product);
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
    const productsWithoutEliminated = await productManager.deleteProduct(uid);
    res.json({
      ok: true,
      productsWithoutEliminated,
    });
  } catch (error) {
    res.status(501).json({
      ok: false,
      msg: await error,
    });
  }
};
