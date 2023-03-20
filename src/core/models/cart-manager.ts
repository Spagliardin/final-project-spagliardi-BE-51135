import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Cart } from "../interfaces/cart.interface";

export class CartManager {
  private carts: Cart[];
  private path: string;

  public get cartUid() {
    return this.uidGenerator;
  }

  constructor(cart: Cart[] = [], path: string = "./dist/db") {
    this.carts = cart;
    this.path = path;
  }

  private uidGenerator(): string {
    return String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );
  }

  private async getFile(): Promise<string> {
    await mkdir(this.path, { recursive: true });
    const url = `${this.path}/carts.json`;
    if (!existsSync(url)) await writeFile(url, JSON.stringify(this.carts));
    try {
      const cartsFromFile = await readFile(url, "utf-8");
      return cartsFromFile;
    } catch (error) {
      throw "Error read file";
    }
  }

  public async addCart(bodyCart: Cart): Promise<Cart[]> {
    this.carts = JSON.parse(await this.getFile()) ?? [];

    this.carts = [
      ...this.carts,
      {
        ...bodyCart,
        cartId: this.cartUid(),
      },
    ];

    await writeFile(`${this.path}/carts.json`, JSON.stringify(this.carts));

    return this.carts;
  }

  public async getCartById(id: string): Promise<Cart> {
    const carts: Cart[] = JSON.parse(await this.getFile());
    const cartById = carts.find((cart: Cart) => cart.cartId === id);
    if (cartById) return cartById;
    else throw "Cart not Found";
  }

  public async addProductToCart(productId: string, cartId: string) {
    const cartById = await this.getCartById(cartId);
    const { products } = cartById;

    const productIndex = products.findIndex(
      (product) => product.product === productId
    );

    let updatedProducts = [...products];

    if (productIndex >= 0) {
      const quantity = updatedProducts[productIndex].quantity ?? 1;
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: quantity + 1,
      };
    } else
      updatedProducts = [
        ...updatedProducts,
        { product: productId, quantity: 1 },
      ];

    const listCartsUpdate = await this.deleteCart(cartById.cartId);
    if (!listCartsUpdate) return listCartsUpdate;

    this.carts = listCartsUpdate;

    const updateCart = [
      {
        cartId: cartById.cartId,
        products: updatedProducts,
      },
    ];

    await writeFile(
      `${this.path}/carts.json`,
      JSON.stringify([...this.carts, ...updateCart])
    );

    return updateCart;
  }

  public async deleteCart(id: string) {
    const cartById = await this.getCartById(id);
    if (!cartById) return cartById;

    const carts: Cart[] = JSON.parse(await this.getFile());
    const cartsWithoutEliminated = carts.filter(
      (cart) => cart.cartId !== cartById.cartId
    );

    await writeFile(
      `${this.path}/carts.json`,
      JSON.stringify(cartsWithoutEliminated)
    );

    return cartsWithoutEliminated;
  }

  public async getCarts() {
    let parsedCarts: Cart[];
    try {
      parsedCarts = JSON.parse(await this.getFile()) ?? [];
      return parsedCarts;
    } catch (error) {
      console.log(error);
      return (parsedCarts = []);
    }
  }
}
