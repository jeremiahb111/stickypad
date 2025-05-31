import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return

  const hashedPassword = await bcryptjs.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
}

interface IUser extends InferSchemaType<typeof userSchema> {
  comparePassword(password: string): Promise<boolean>
}

export type TUser = HydratedDocument<IUser>

export const User = model<IUser>('User', userSchema)