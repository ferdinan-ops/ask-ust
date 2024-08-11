import Joi from 'joi'
import { IForumTypeUpdatePayload, type IForum } from '../types/forum.type'

export const validForum = (payload: IForum) => {
  const schema = Joi.object<IForum>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
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

export const validUpdateForumType = (payload: IForumTypeUpdatePayload) => {
  const schema = Joi.object<IForumTypeUpdatePayload>({
    note: Joi.string().allow(''),
    is_publish: Joi.boolean().required()
  })

  return schema.validate(payload)
}
