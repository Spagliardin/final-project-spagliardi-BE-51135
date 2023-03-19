import { Request, Response } from "express";
import { ProductManager } from "../core/models/product-manager"

const productManager = new ProductManager()

export const getProducts = async (req: Request, res: Response) => {

  const listProducts = await productManager.getProducts()

  res.json({
    ok: true,
    products: listProducts,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  
  const uid = req.params.pid
  const product = await productManager.getProductByID(uid)

  res.json({
    ok: true,
    product: product
  })


  // localhost:8080/api/products/1gqv6lhj70a7df5f3e9a683
}

export const createProduct = async (req: Request, res: Response) => {
  



}

