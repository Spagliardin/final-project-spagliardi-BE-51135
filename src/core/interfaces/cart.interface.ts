import { Document, Types } from "mongoose";

export interface CartsInput extends Document {
  products: ProductCart[];
  cartId: string
}

export interface ProductCart {
  product:  Types.ObjectId;
  quantity: number;
}
