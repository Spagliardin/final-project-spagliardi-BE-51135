import { Document, ObjectId, Types } from "mongoose";

export interface CartsInput extends Document {
  products: ProductCart[];
  cartId: string
}

export interface ProductCart extends Document {
  product:  Types.ObjectId;
  quantity: number;
}
