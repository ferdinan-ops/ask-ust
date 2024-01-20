import Joi from 'joi'
import { type IUser } from '../types/user.type'

export const validUpdateUser = (payload: IUser) => {
  const schema = Joi.object<IUser>({
    fullname: Joi.string().min(3).max(50),
    username: Joi.string().min(3).max(50),
    email: Joi.string().email()
  })

  return schema.validate(payload)
}
