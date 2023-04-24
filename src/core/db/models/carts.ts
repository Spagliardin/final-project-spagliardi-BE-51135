import { Schema, model } from 'mongoose'
import { CartsInput } from '../../interfaces/cart.interface';

const CartSchema = new Schema<CartsInput>({

  products: {
    type: [
      {            
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          require: true
        },
        quantity: {
          type: Number
        }
      }
    ],
    default: []
  }

})

CartSchema.method('toJSON', function() {
  const {__v, _id, ...object}: any = this.toObject();
  
  object.products = object.products.map(({product, ...objects}: any) => {
    const { __v, _id, ...object } = product
    object.pid = _id
    return { product: object, ...objects }
  })

  object.cid = _id
  return object
})

// CartSchema.method('toJSON', function () {
//   const { products } = this.toObject()
//   const { product } = products
//   const { __v, _id, ...object } = product
//   object.pid = _id
//   return object
// })

export default model<CartsInput>( 'Carts', CartSchema )