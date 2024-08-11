import { Request, Response } from 'express'
import { validAnswers } from '../validations/answer.validation'

import * as AnswerService from '../services/answer.service'
import * as LectureService from '../services/lecture.service'
import * as ValidateService from '../services/validate.service'

import { QuestionType } from '@prisma/client'
import { IAnswerBody } from '../types/answer.type'
import ENV from '../utils/environment'
import { logError, logInfo } from '../utils/logger'

export const createAnswers = async (req: Request, res: Response) => {
  const { value, error } = validAnswers(req.body as IAnswerBody)
  const payload = value as IAnswerBody

  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const dosenQuestions = payload.answers.filter((item) => item.questionId === ENV.questionDosenId)[0]
    const isCorrectDosen = await LectureService.fetchLecturesByName(
      dosenQuestions.answer.toString().split(',')[0].trim().toLocaleLowerCase()
    )

    await AnswerService.addNewAnswer({
      answer: JSON.stringify(dosenQuestions.answer),
      question_id: dosenQuestions.questionId,
      is_correct: !!isCorrectDosen,
      user_id: payload.user_id
    })

    const matKulQuestions = payload.answers.filter((item) => item.questionId === ENV.questionMatkulId)[0]
    if (!isCorrectDosen) {
      await AnswerService.addNewAnswer({
        answer: JSON.stringify(matKulQuestions.answer),
        question_id: matKulQuestions.questionId,
        is_correct: false,
        user_id: payload.user_id
      })
    } else {
      const isCorrectMatkul = await LectureService.checkMatkulAnswer(
        isCorrectDosen.id,
        matKulQuestions.answer.toString().toLocaleLowerCase()
      )

      await AnswerService.addNewAnswer({
        answer: JSON.stringify(matKulQuestions.answer),
        question_id: matKulQuestions.questionId,
        is_correct: !!isCorrectMatkul,
        user_id: payload.user_id
      })
    }

    const newPayload = payload.answers.filter(
      (item) => item.questionId !== ENV.questionDosenId && item.questionId !== ENV.questionMatkulId
    )

    newPayload.forEach(async (item) => {
      const question = await AnswerService.getCorrectAnswers(item.questionId)

      const isCorrect = await AnswerService.checkAnswer(
        item.answer,
        question?.correct_answers as string,
        question?.type as QuestionType
      )

      await AnswerService.addNewAnswer({
        answer: JSON.stringify(item.answer),
        question_id: item.questionId,
        is_correct: isCorrect,
        user_id: payload.user_id
      })
    })

    await AnswerService.sendNotificationToAdmin(payload.user_id)
    const correctAnswerCount = await AnswerService.getIsCorrectAnswerCount(payload.user_id)

    let value
    if (correctAnswerCount >= 6) {
      value = { isValid: true, note: '' }
    } else {
      value = {
        isValid: false,
        note: 'Maaf, jawaban kuis yang telah kamu kirimkan sepertinya tidak sesuai dengan harapan kami. Mohon ikuti syarat dan ketentuan yang berlaku dari aplikasi ini ya!'
      }
    }

    const validate = await ValidateService.changeValidateStatus(payload.validate_id, value)
    await ValidateService.sendValidateNotification(validate.user.email, validate.is_valid, validate.note as string)

    logInfo(req, 'Answers submitted successfully')
    res.status(201).json({
      message: 'Answers submitted successfully',
      data: {
        validate: {
          id: validate.id,
          is_valid: validate.is_valid,
          note: validate.note,
          role: validate.role,
          url_quiz_record: validate.url_quiz_record,
          user_id: validate.user_id
        }
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getAnswers = async (req: Request, res: Response) => {
  const userId = req.params?.userId

  try {
    const answers = await AnswerService.getAnswersByUserId(userId)
    const data = answers.map((result) => ({
      ...result,
      answer: JSON.parse(result.answer as string),
      question: {
        ...result.question,
        options: JSON.parse(result.question.options as string),
        correct_answers: JSON.parse(result.question.correct_answers as string)
      }
    }))

    logInfo(req, 'Answers retrieved successfully')
    res.status(200).json({
      message: 'Answers retrieved successfully',
      data
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
