import Joi from 'joi'
import { IQuestion } from '../services/question.service'

export const validQuestion = (payload: IQuestion) => {
  const schema = Joi.object<IQuestion>({
    text: Joi.string().required(),
    options: Joi.array()
      .items(Joi.object({ value: Joi.string().required() }))
      .required(),
    correct_answers: Joi.array()
      .items(
        Joi.object({
          value: Joi.string().required(),
          checked: Joi.boolean().allow(null)
        })
      )
      .required(),
    type: Joi.string().valid('text', 'radio', 'checkbox').required()
  })

  return schema.validate(payload)
}
