import { QuestionType } from '@prisma/client'
import db from '../utils/db'
import logger from '../utils/logger'

interface ICorrectAnswer {
  value: string
  checked: boolean
}

export interface IQuestion {
  text: string
  options: Array<Omit<ICorrectAnswer, 'checked'>>
  correct_answers: ICorrectAnswer[]
  type: QuestionType
}

export const fetchQuestions = async () => {
  return await db.question.findMany({
    orderBy: { created_at: 'desc' }
  })
}

export const fetchQuestionForUser = async () => {
  return await db.question.findMany({
    select: {
      id: true,
      text: true,
      options: true,
      type: true
    }
  })
}

export const fetchQuestionById = async (id: string) => {
  return await db.question.findUnique({
    where: { id }
  })
}

export const addNewQuestion = async (payload: IQuestion) => {
  const { options, correct_answers: correctAnswer, ...rest } = payload

  const optionsJson = JSON.stringify(options)
  const correctAnswerJson = JSON.stringify(correctAnswer)

  logger.info({ optionsJson, correctAnswerJson })

  return await db.question.create({
    data: {
      ...rest,
      type: payload.type.toLocaleUpperCase() as QuestionType,
      options: optionsJson,
      correct_answers: correctAnswerJson
    }
  })
}

export const changeQuestionById = async (id: string, payload: IQuestion) => {
  const { options, correct_answers: correctAnswer, ...rest } = payload

  const optionsJson = JSON.stringify(options)
  const correctAnswerJson = JSON.stringify(correctAnswer)

  return await db.question.update({
    where: { id },
    data: {
      ...rest,
      type: payload.type.toLocaleUpperCase() as QuestionType,
      options: optionsJson,
      correct_answers: correctAnswerJson
    }
  })
}
