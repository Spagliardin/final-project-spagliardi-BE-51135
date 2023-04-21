import Carts from "../db/models/carts";
import { Document, Types } from "mongoose";
import { CartsInput, ProductCart } from "./../interfaces/cart.interface";

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

  public async getCartById(cid: string): Promise<
    | (Document<unknown, {}, CartsInput> &
        Omit<
          CartsInput & {
            _id: Types.ObjectId;
          },
          never
        >)
    | null
  > {
    const cartById = await Carts.findById(cid).populate("products.product");
    try {
      return cartById;
    } catch (error) {
      console.error(error);
      throw "Cart not Found";
    }
  }

  public async addProductToCart(
    productId: string,
    cartId: string
  ): Promise<ProductCart[] | null | Error> {
    const cartById = await this.getCartById(cartId);

    if (!cartById) throw "Cart ID invalid";
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
      console.error(error);
      throw "Error update with add product";
    }
  }

  public async deleteProductToCart(productId: string, cartId: string) {
    const cartById = await this.getCartById(cartId);

    if (!cartById) throw "Cart ID invalid";

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
      console.error(error);
      throw "Error update with delete product";
    }
  }

  public async getCarts() {
    try {
      return await Carts.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteAllCart(cartId: string): Promise<string | Error> {
    const cartById = await this.getCartById(cartId);
    if (!cartById) throw "Cart ID invalid";

    await Carts.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
    );

    try {
      return "Deleted success";
    } catch (error) {
      console.error(error);
      throw "Error with this updated in cart";
    }
  }

  public async modifyQuantity(cartId: string, productId: string, quantity: number){
    const cartById = await this.getCartById(cartId);

    if (!cartById) throw "Cart ID invalid";

    const { products } = cartById;
    const productIndex = this.productIndex(products, productId);
    const productsId = products[productIndex]._id;

    const updatedQuantity = await Carts.findOneAndUpdate(
      { "products._id": productsId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate("products.product");

    try {
      return updatedQuantity
    } catch (error) {
      throw 'Error in update quantity'
    }
  }

  private productIndex(products: ProductCart[], productId: string): number {
    return products.findIndex(
      (product: ProductCart) => product.product?._id.toJSON() === productId
    );
  }
}
