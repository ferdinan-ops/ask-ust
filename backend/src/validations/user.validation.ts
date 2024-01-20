import Joi from 'joi'
import { type IChangePasswordPayload, type IUserUpdatePayload } from '../types/user.type'

export const validUpdateUser = (payload: IUserUpdatePayload) => {
  const schema = Joi.object<IUserUpdatePayload>({
    fullname: Joi.string().min(3).max(50),
    username: Joi.string().min(3).max(50)
  })

  return schema.validate(payload)
}

export const validChangePassword = (payload: IChangePasswordPayload) => {
  const schema = Joi.object<IChangePasswordPayload>({
    password: Joi.string().min(6).max(50).required()
  })

  return schema.validate(payload)
}
