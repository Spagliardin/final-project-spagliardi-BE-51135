import { ProductInterface } from "../interfaces/product.interface";
import Product from "../db/models/products";
import { PaginateResult, SortOrder, Document, ObjectId } from "mongoose";

interface ResultPaginate {
  products: PaginateResult<Document<unknown, { limit: number; page: number; }, ProductInterface> & Omit<ProductInterface & { _id: ObjectId; }, never>>
}

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

  public async getProducts( sort: any, query: string, limit: number, page: number ): Promise< ResultPaginate | Error> {

    if(sort) sort = [['price', sort]]

    const options = {
      sort,
      limit,
      page,
      query
    }

    const products = await Product.paginate({}, options)

    try {
      return {
        products
      }
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
