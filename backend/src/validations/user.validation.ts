import Joi from 'joi'
import { type IUserUpdatePayload } from '../types/user.type'

export const validUpdateUser = (payload: IUserUpdatePayload) => {
  const schema = Joi.object<IUserUpdatePayload>({
    fullname: Joi.string().min(3).max(50),
    username: Joi.string().min(3).max(50)
  })

  return schema.validate(payload)
}
