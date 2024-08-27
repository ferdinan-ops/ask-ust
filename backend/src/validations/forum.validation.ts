import Joi from 'joi'
import { type IForum } from '../types/forum.type'

export const validForum = (payload: IForum) => {
  const schema = Joi.object<IForum>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    privacy: Joi.string().required(),
    image: Joi.any()
  })

  return schema.validate(payload)
}

export const validUpdateForum = (payload: IForum) => {
  const schema = Joi.object<IForum>({
    description: Joi.string(),
    image: Joi.any()
  })

  return schema.validate(payload)
}
