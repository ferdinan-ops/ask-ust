import Joi from 'joi'
import { type IMessageBody } from '../types/message.type'

export const validMessage = (payload: IMessageBody) => {
  const shcema = Joi.object<IMessageBody>({
    content: Joi.string().required(),
    forumId: Joi.string().required()
  })

  return shcema.validate(payload)
}
