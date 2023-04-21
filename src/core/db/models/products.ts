import { PaginateModel, Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2';
import { ProductDocument, ProductInterface } from '../../interfaces/product.interface';

const ProductSchema = new Schema<ProductInterface>({

  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    require: true
  },
  thumbnail: {
    type: Array
  },
  code: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    require: true
  }

})

ProductSchema.plugin(paginate)

ProductSchema.method<ProductInterface>('toJSON', function() {
  const {__v, _id, ...object} = this.toObject();
  object.pid = _id
  return object
})


export default model<ProductInterface>( 'Product', ProductSchema ) as ProductDocument<ProductInterface>