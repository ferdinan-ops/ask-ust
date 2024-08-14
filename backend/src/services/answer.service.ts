import { QuestionType } from '@prisma/client'
import db from '../utils/db'
import { IAnswerPayload, ICheckbox } from '../types/answer.type'
import sendMail from '../middlewares/mailer'
import { emailFormat } from '../utils/emailFormat'
import ENV from '../utils/environment'

export const getAnswersByUserId = async (userId: string) => {
  return await db.answer.findMany({
    where: { user_id: userId },
    include: {
      question: true
    }
  })
}

export const getIsCorrectAnswerCount = async (userId: string) => {
  return await db.answer.count({
    where: {
      user_id: userId,
      is_correct: true
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

export const sendNotificationToAdmin = async (userId: string) => {
  const userRegister = await db.user.findUnique({
    where: { id: userId }
  })

  const users = await db.user.findMany({
    where: {
      OR: [{ role: 'SUPER_ADMIN' }, { role: 'ADMIN' }]
    },
    select: { email: true }
  })

  users.forEach((user) => {
    sendMail({
      from: ENV.aplicationName,
      to: user?.email,
      subject: 'Verifikasi Data',
      html: emailFormat({
        btnText: 'Lihat ke aplikasi',
        btnLink: `${ENV.publicUrl}/admin/validate/${userId}`,
        children: `
        <p>Halo Admin,</p>
        <p>
          Terdapat data pengguna baru dengan nama <b>${userRegister?.fullname}</b> yang perlu diverifikasi oleh kamu, ayo segera cek aplikasi USTalk untuk melihat data tersebut.
        </p>
    `
      })
    })
  })
}
