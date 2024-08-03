import { Request, Response } from 'express'
import * as QuestionService from '../services/question.service'
import { logError, logInfo } from '../utils/logger'
import { validQuestion } from '../validations/question.validation'
import ENV from '../utils/environment'

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const results = await QuestionService.fetchQuestions()
    const questions = results.map((result) => ({
      ...result,
      correct_answers: JSON.parse(result.correct_answers as string),
      options: JSON.parse(result.options as string)
    }))

    const defaultQuestions = questions.filter(
      (question) => question.id !== ENV.questionDosenId && question.id !== ENV.questionMatkulId
    )

    const dosenQuestions = questions.filter(
      (question) => question.id === ENV.questionDosenId || question.id === ENV.questionMatkulId
    )

    logInfo(req, 'Questions fetched successfully')
    res.status(200).json({
      message: 'Kuis berhasil diambil',
      data: {
        default: defaultQuestions,
        dosen: dosenQuestions
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getQuestionForUser = async (req: Request, res: Response) => {
  try {
    const questions = await QuestionService.fetchQuestionForUser()
    const data = questions.map((result) => ({
      ...result,
      options: JSON.parse(result.options as string)
    }))

    const defaultQuestions = data.filter(
      (question) => question.id !== ENV.questionDosenId && question.id !== ENV.questionMatkulId
    )
    const dosenQuestions = data.filter(
      (question) => question.id === ENV.questionDosenId || question.id === ENV.questionMatkulId
    )

    // shuffle default questions and limit to 10
    const dataQuestions = defaultQuestions.sort(() => Math.random() - 0.5)

    // short the dosenQuestion where the questionDosenId is the first element
    const dataDosenQuestions = dosenQuestions.sort((a, b) => (a.id === ENV.questionDosenId ? -1 : 1))

    logInfo(req, 'Questions fetched successfully')
    res.status(200).json({
      message: 'Kuis berhasil diambil',
      data: {
        default: dataQuestions.splice(0, 8),
        dosen: dataDosenQuestions
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const createQuestion = async (req: Request, res: Response) => {
  const { value, error } = validQuestion(req.body as QuestionService.IQuestion)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await QuestionService.addNewQuestion(value)

    logInfo(req, 'Question created successfully')
    res.status(201).json({ message: 'Pertanyaan berhasil dibuat' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const updateQuestion = async (req: Request, res: Response) => {
  if (!req.params?.questionId) {
    logError(req, 'Question ID is not provided')
    return res.status(400).json({ message: 'Question ID is required' })
  }

  const { value, error } = validQuestion(req.body as QuestionService.IQuestion)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const question = await QuestionService.fetchQuestionById(req.params.questionId)
    if (!question) {
      logError(req, 'Question not found')
      return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' })
    }

    await QuestionService.changeQuestionById(req.params.questionId, value)

    logInfo(req, 'Question updated successfully')
    res.status(200).json({ message: 'Pertanyaan berhasil diupdate' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
