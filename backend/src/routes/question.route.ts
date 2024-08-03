import express from 'express'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import { createQuestion, getQuestionForUser, getQuestions, updateQuestion } from '../controllers/question.controller'

const questionRoute = express.Router()

questionRoute.get('/', verifyJwt, verifyAdmin, getQuestions)
questionRoute.get('/user', getQuestionForUser)
questionRoute.post('/', verifyJwt, verifyAdmin, createQuestion)
questionRoute.put('/:questionId', verifyJwt, verifyAdmin, updateQuestion)

export default questionRoute
