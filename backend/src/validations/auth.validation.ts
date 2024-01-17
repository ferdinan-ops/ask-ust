import Joi from 'joi'

import { type ILoginPayload, type IUser } from '../types/user.type'

export const validRegister = (payload: IUser) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().allow(null, ''),
    photo: Joi.string().allow(null, '')
  })

  return schema.validate(payload)
}

export const validLogin = (payload: ILoginPayload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
