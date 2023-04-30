import { Schema, model } from 'mongoose'
import { UserInterface } from '../../interfaces/user.interface'

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    require: true
  },
  email:{
      type: String,
      require: true,
      unique: true
  },
  password:{
      type: String,
      require: true
  },
  img:{
      type: String,
  },
  role:{
      type: String,
      require: true,
      default: 'USER_ROLE'
  },
  google:{
      type: Boolean,
      default: false
  }
})

UserSchema.method<UserInterface>('toJSON', function name() {
  const {__v, _id, password, ...object} = this.toObject();

  object.uid = _id
  return object
})

export default model<UserInterface>( 'User', UserSchema )