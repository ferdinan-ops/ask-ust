import Joi from 'joi'
import { type IForum } from '../types/forum.type'

export const validForum = (payload: IForum) => {
  const schema = Joi.object<IForum>({
    title: Joi.string().required(),
    description: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validUpdateForum = (payload: IForum) => {
  const schema = Joi.object<IForum>({
    description: Joi.string()
  })

  return schema.validate(payload)
}
