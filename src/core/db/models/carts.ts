import { Schema, model } from 'mongoose'
import { Cart } from '../../interfaces/cart.interface';

const CartSchema = new Schema({

  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  }

})

CartSchema.method('toJSON', function() {
  const {__v, _id, ...object} = this.toObject();
  object.cid = _id
  return object
})

export default model<Cart>( 'Cart', CartSchema )