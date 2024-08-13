import express from 'express'
import { createAnswers, getAnswers } from '../controllers/answer.controller'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import upload from '../middlewares/multer'

const answerRoute = express.Router()

answerRoute.get('/:userId', verifyJwt, verifyAdmin, getAnswers)
answerRoute.post('/', createAnswers)

export default answerRoute
