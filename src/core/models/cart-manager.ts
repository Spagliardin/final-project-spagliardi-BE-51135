import { CartsInput, ProductCart } from './../interfaces/cart.interface';
import Carts  from "../db/models/carts";
import mongoose, { ObjectId } from 'mongoose';

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
      const cart = new Carts(bodyCart)
      await cart.save()

      const carts = await this.getCarts()
      return carts

    } catch (error) {
      throw error
    }
  }

  public async getCartById(cid: string): Promise<CartsInput> {
    const cartById = await Carts.findById(cid).populate('products.product');
    if (cartById) return cartById;
    else throw "Cart not Found";
  }

  public async addProductToCart(productId: string, cartId: string) {
    const cartById = await this.getCartById(cartId);
    const { products } = cartById;

    // const pid = new ObjectId(productId).

    const productIndex = products.findIndex(
      (product: ProductCart) => {
        console.log((product.product?._id.toJSON()));
        console.log(productId);
        return product.product?._id.toJSON() === productId
      } 
    );

    let updatedCart;

    if (productIndex >= 0) {
      console.log('ENTRA ACA')

      const updatedProducts = (cartById.get('products'))
      const productsId = updatedProducts[productIndex]._id.toJSON()
      const quantity = updatedProducts[productIndex].quantity;
      
      updatedCart = await Carts.findOneAndUpdate(
        { "products._id" : productsId },
        { $set: {  'products.$.quantity' : quantity + 1 }},
        { new: true })
        .populate('products.product')

    } else {
      console.log('ELSE')
      updatedCart = await Carts.findByIdAndUpdate(
        cartId,
        { $push: { products: { product: productId, quantity: 1 }}},
        { new: true })
        .populate('products.product')
    }

    // console.log(updatedCart);

    return updatedCart;
  }

  // public async deleteCart(id: string) {
  //   const cartById = await this.getCartById(id);
  //   if (!cartById) return cartById;

  //   const carts: CartsInput[] = JSON.parse(await this.getFile());
  //   const cartsWithoutEliminated = carts.filter(
  //     (cart) => cart.cartId !== cartById.cartId
  //   );

  //   await writeFile(
  //     `${this.path}/carts.json`,
  //     JSON.stringify(cartsWithoutEliminated)
  //   );

  //   return cartsWithoutEliminated;
  // }

  public async getCarts() {
    try {
      return await Carts.find()
    } catch (error) {
      throw error
    }
  }
}
