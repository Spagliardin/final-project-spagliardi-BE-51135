import { Document, PaginateModel } from "mongoose"

export interface ProductInterface extends Document {
  title: string,
  description: string,
  price: number,
  code: string,
  status: boolean,
  category: string
  stock: number
  thumbnail?: string,
}

export interface ProductDocument<T extends Document> extends PaginateModel<T> {}