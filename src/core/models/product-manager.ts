import { existsSync } from "node:fs";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { Product } from "../interfaces/product.interface";

export class ProductManager {
  private products: Product[];
  private path: string;

  public get productUid(){
    return this.uidGenerator
  }

  constructor(products: Product[] = [], path: string = "./dist/db") {
    this.products = products;
    this.path = path;
  }

  private uidGenerator(): string {
    return String(Date.now().toString(32) + Math.random().toString(16))
                .replace(/\./g,"");
  }

  private async getFile(): Promise<string> {
    await mkdir(this.path, { recursive: true })
    const url = `${this.path}/products.json`;
    if (!existsSync(url)) await writeFile(url, JSON.stringify(this.products))
    try {
      const productsFromFile = await readFile(url, "utf-8");
      return productsFromFile;
    } catch (error) {
      throw "Error read file";
    }
  }

  public async addProduct(bodyProduct: Product): Promise<Product[] | Error> {
    this.products = JSON.parse(await this.getFile()) ?? [];

    const isIdemCode = this.products
      ? this.products.filter((product) => product.code === bodyProduct.code)
          .length > 0
      : false;

    if (!isIdemCode) {
      this.products = [
        ...this.products,
        {
          ...bodyProduct,
          productId: this.productUid(),
        },
      ];

      await writeFile(
        `${this.path}/products.json`,
        JSON.stringify(this.products)
      );
    } else {
      throw "No two codes can be the same";
    }
    return this.products;
  }

  public async getProducts(): Promise<Product[]> {
    let parsedProducts: Product[];
    try {
      parsedProducts = JSON.parse(await this.getFile()) ?? [];
      return parsedProducts;
    } catch (error) {
      console.log(error);
      return (parsedProducts = []);
    }
  }

  public async getProductByID(id: string): Promise<Product | Error | any> {
    const products: Product[] = JSON.parse(await this.getFile());
    const productByID = products.find((product: Product) => product.productId === id);
    if (productByID) return productByID;
    else throw 'Product not found'
    
  }

  public async updateProduct(id: string, product: Product | any) {
    if (product.id) {
      throw "the id cannot be changed"
    }

    const productbyID: Product | any = await this.getProductByID(id);
    const updateProduct: Product = Object.keys(productbyID).reduce(
      (obj: any, key: string) => {
        if (product[key]) obj[key] = product[key];
        else obj[key] = productbyID[key];
        return obj;
      },
      {}
    );
    
    const listProductUpdate = await this.deleteProduct(productbyID.productId);
    if(!listProductUpdate) return listProductUpdate
    this.products = listProductUpdate
    await writeFile(
      `${this.path}/products.json`,
      JSON.stringify([...this.products, updateProduct])
    );

    return updateProduct
  }

  public async deleteProduct(id: string) : Promise<Product[] | Error | any> {
    const productbyID = await this.getProductByID(id);
    if(!productbyID) return productbyID

    const products = await this.getProducts();
    const productsWithoutEliminated = products.filter(
      (product) => product.productId !== productbyID.productId
    );
    await writeFile(
      `${this.path}/products.json`,
      JSON.stringify(productsWithoutEliminated)
    );

    return productsWithoutEliminated;
  }
}
