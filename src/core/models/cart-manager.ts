import { CartsInput, ProductCart } from "./../interfaces/cart.interface";
import Carts from "../db/models/carts";
import mongoose, { ObjectId } from "mongoose";

export class CartManager {
  public get cartUid() {
    return this.uidGenerator;
  }

  constructor() {}

  private uidGenerator(): string {
    return String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );
  }

  public async addCart(bodyCart: ProductCart): Promise<CartsInput[]> {
    try {
      const cart = new Carts(bodyCart);
      await cart.save();

      const carts = await this.getCarts();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  public async getCartById(cid: string): Promise<CartsInput> {
    const cartById = await Carts.findById(cid).populate("products.product");
    if (cartById) return cartById;
    else throw "Cart not Found";
  }

  public async addProductToCart(
    productId: string,
    cartId: string
  ): Promise<ProductCart[] | null | Error> {
    
    const cartById = await this.getCartById(cartId);
    const { products } = cartById;

    const productIndex = this.productIndex(products, productId);

    let updatedCart: ProductCart[] | null;

    if (productIndex >= 0) {
      const updatedProducts = cartById.get("products");
      const productsId = updatedProducts[productIndex]._id.toJSON();
      const quantity = updatedProducts[productIndex].quantity;

      updatedCart = await Carts.findOneAndUpdate(
        { "products._id": productsId },
        { $set: { "products.$.quantity": quantity + 1 } },
        { new: true }
      ).populate("products.product");
    } else {
      updatedCart = await Carts.findByIdAndUpdate(
        cartId,
        { $push: { products: { product: productId, quantity: 1 } } },
        { new: true }
      ).populate("products.product");
    }

    try {
      return updatedCart;
    } catch (error) {
      throw "Error update with add product";
    }
  }

  public async deleteProductToCart(productId: string, cartId: string) {
    const cartById = await this.getCartById(cartId);
    const { products } = cartById;
    const productIndex = this.productIndex(products, productId);
    const productsId = products[productIndex]._id;

    const deleteProduct = async () =>
      await Carts.findOneAndUpdate(
        { "products._id": productsId },
        { $pull: { products: { product: productId } } },
        { new: true }
      );

    try {
      const cartWithoutDeletedProduct = await deleteProduct();
      return cartWithoutDeletedProduct;
    } catch (error) {
      throw "Error update with delete product";
    }
  }

  public async getCarts() {
    try {
      return await Carts.find();
    } catch (error) {
      throw error;
    }
  }

  public async updateCart(cartId: string){
    const cartById = await this.getCartById(cartId)
  }

  private productIndex(products: ProductCart[], productId: string): number {
    return products.findIndex(
      (product: ProductCart) => product.product?._id.toJSON() === productId
    );
  }
}
