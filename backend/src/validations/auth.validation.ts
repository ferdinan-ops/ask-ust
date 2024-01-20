import Joi from 'joi'

import {
  type IVerifyEmailPayload,
  type ILoginPayload,
  type IUser,
  type IResetPasswordPayload
} from '../types/user.type'

export const validRegister = (payload: IUser) => {
  const schema = Joi.object<IUser>({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().allow(null, ''),
    photo: Joi.string().allow(null, '')
  })

  return schema.validate(payload)
}

export const validLogin = (payload: ILoginPayload) => {
  const schema = Joi.object<ILoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validVerifyEmail = (payload: IVerifyEmailPayload) => {
  const schema = Joi.object<IVerifyEmailPayload>({
    token: Joi.string().required()
  })
  return schema.validate(payload)
}

export const validResetPassword = (payload: IResetPasswordPayload) => {
  const schema = Joi.object<IResetPasswordPayload>({
    token: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}
