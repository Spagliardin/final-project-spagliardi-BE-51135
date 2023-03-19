import { writeFile, readFile } from "node:fs/promises";
import { Product } from "../interfaces/product.interface";
// import {  } from "../../db";

export class ProductManager {

  private products: Product[];
  private path: string;

  constructor(products = [], path = "./dist/db") {
    this.products = products;
    this.path = path;
  }

  private uid(): string {
    return String(Date.now().toString(32) + Math.random().toString(16))
                  .replace(/\./g,"");
  }

  private async getFile(): Promise<string> {
    try {
      const url = `${this.path}/products.json`;
      const productsFromFile = await readFile(url, 'utf-8');
      return productsFromFile;
    } catch (error) {
      console.log(error);
      return 'Error read file';
    }
  }

  public async addProduct(bodyProduct: Product) {
    this.products = JSON.parse(await this.getFile()) ?? [];

    const isIdemCode = this.products
      ? this.products.filter((product) => product.code === bodyProduct.code).length > 0
      : false;

    if (!isIdemCode) {
      this.products = [
        ...this.products,
        {
          ...bodyProduct,
          id: this.uid(),
        },
      ];

      await writeFile(
        `${this.path}products.json`,
        JSON.stringify(this.products)
      );
    } else {
      throw Error("No two codes can be the same");
    }
  }

  public async getProducts(): Promise<Product[]> {
    let parsedProducts: Product[];
    try {
      parsedProducts = JSON.parse(await this.getFile()) ?? [];
      return parsedProducts;
    } catch (error) {
      console.log(error);
      return parsedProducts = []
    }
  }

  public async getProductByID(id: string) : Promise<Product | any> {
    const products: Product[] = JSON.parse(await this.getFile());
    const productByID = products.find((product: Product) => product.id === id);
    if (productByID) return productByID;
  }

  public async updateProduct(id: string, product: Product | any) {
    if (product.id) {
      console.error("the id cannot be changed");
      return;
    }

    const productbyID: Product | any = await this.getProductByID(id);
    const updateProduct: Product = Object.keys(productbyID).reduce((obj: any, key: string) => {
      if (product[key]) obj[key] = product[key];
      else obj[key] = productbyID[key];
      return obj;
    }, {});
    this.products = await this.deleteProduct(productbyID.id);
    await writeFile(
      `${this.path}products.json`,
      JSON.stringify([...this.products, updateProduct])
    );
  }

  public async deleteProduct(id: string) {
    const productbyID = await this.getProductByID(id);
    const products = await this.getProducts();
    const productsWithoutEliminated = products.filter(
      (products) => products.id !== productbyID.id
    );
    await writeFile(
      `${this.path}products.json`,
      JSON.stringify(productsWithoutEliminated)
    );
    return productsWithoutEliminated;
  }
}
