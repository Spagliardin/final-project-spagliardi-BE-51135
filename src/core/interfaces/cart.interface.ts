import { Document, Types } from "mongoose";
export interface Cart {
  products: ProductCart[];
  cartId: string
}

export interface ProductCart {
  product:  string;
  quantity: number;
}
