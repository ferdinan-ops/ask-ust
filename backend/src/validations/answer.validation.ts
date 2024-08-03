import Joi from 'joi'
import { IAnswerBody, IBody } from '../types/answer.type'

export const validAnswers = (payload: IAnswerBody) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    answers: Joi.array().items(
      Joi.object<IBody>({
        answer: Joi.alternatives()
          .try(
            Joi.string(),
            Joi.array().items(
              Joi.object({
                value: Joi.string().required(),
                checked: Joi.boolean().required()
              })
            )
          )
          .required(),
        questionId: Joi.string().required()
      })
    )
  })

  return schema.validate(payload)
}
