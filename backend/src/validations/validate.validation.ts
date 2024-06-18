import Joi from 'joi'
import { IValidateUpdatePayload } from '../types/validate.type'

export const validUpdateValidate = (payload: IValidateUpdatePayload) => {
  const schema = Joi.object<IValidateUpdatePayload>({
    userId: Joi.string().required(),
    note: Joi.string(),
    isValid: Joi.boolean().required()
  })

  return schema.validate(payload)
}
