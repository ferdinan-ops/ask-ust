import Joi from 'joi'
import { IValidateUpdatePayload } from '../types/validate.type'

export const validUpdateValidate = (payload: IValidateUpdatePayload) => {
  const schema = Joi.object<IValidateUpdatePayload>({
    note: Joi.string().allow(''),
    isValid: Joi.boolean().required()
  })

  return schema.validate(payload)
}
