import { ProductInterface } from "../interfaces/product.interface";
import Product from "../db/models/products";
import { SortOrder } from "mongoose";

export class ProductManager {

  public get productUid(){
    return this.uidGenerator
  }

  constructor() {}

  private uidGenerator(): string {
    return String(Date.now().toString(32) + Math.random().toString(16))
                .replace(/\./g,"");
  }

  public async addProduct(bodyProduct: ProductInterface): Promise<ProductInterface[] | Error> {
    
    try {

      const { code } = bodyProduct
      const duplicateCode = await Product.findOne({ code })

      if (duplicateCode) throw 'No two codes can be the same' 

      const product = new Product(bodyProduct);
      await product.save();

      const products = await Product.find()
      
      return products
    } catch (error) {
      console.error(error);
      throw error || "add product not found";
    }
  }

  public async getProducts(sort: SortOrder, query: string, limit?: number, page?: number ): Promise<{products: ProductInterface[], total: number} | Error> {

    const [ products, total ] = await Promise.all([
      Product.find({}, query )
             .limit( limit ?? 10 )
             .sort([['price', sort]]),
              
      Product.countDocuments()
    ])

    try {
      return {
        products,
        total
      };
    } catch (error) {
      console.error(error);
      throw 'Products not found'
    }
  }

  public async getProductByID(pid: string): Promise<ProductInterface | Error | any> {
    const productByID = await Product.findById(pid)
    if (productByID) return productByID;
    else throw 'Product not found'
  }

  public async updateProduct(pid: string, product: ProductInterface | any) {

    if (product.pid) throw "the id cannot be changed"

    const productbyID: ProductInterface | any = await this.getProductByID(pid);
    if (!productbyID) throw "error with this pid"
    
    const updateProduct: ProductInterface | null = await Product.findByIdAndUpdate(pid, product, { new: true })

    return updateProduct
  }

  public async deleteProduct(pid: string) : Promise<ProductInterface | Error | any> {
    const productbyID = await this.getProductByID(pid);
    if(!productbyID) throw "error with this pid, contact admin"
    return await Product.findByIdAndDelete(pid)
  }
}
