import { QuestionType } from '@prisma/client'
import db from '../utils/db'
import { IAnswerPayload, ICheckbox } from '../types/answer.type'

export const getAnswersByUserId = async (userId: string) => {
  return await db.answer.findMany({
    where: { user_id: userId },
    include: {
      question: true
    }
  })
}

export const addNewAnswer = async (payload: IAnswerPayload) => {
  return await db.answer.create({ data: payload })
}

export const getCorrectAnswers = async (questionId: string) => {
  return await db.question.findUnique({
    where: { id: questionId },
    select: {
      correct_answers: true,
      id: true,
      type: true
    }
  })
}

export const checkAnswer = (answer: string | ICheckbox[], correctAnswers: string, type: QuestionType) => {
  if (type === 'TEXT' || type === 'RADIO') {
    if (typeof answer === 'string') {
      const correctAnswersParsed = JSON.parse(correctAnswers)
      return answer.toLocaleLowerCase() === correctAnswersParsed?.[0]?.value?.toLocaleLowerCase()
    }
  }

  const correctAnswersParsed = JSON.parse(correctAnswers)
  const answerParsed = answer as ICheckbox[]

  return correctAnswersParsed.every((item: ICheckbox, index: number) => item.checked === answerParsed[index].checked)
}
