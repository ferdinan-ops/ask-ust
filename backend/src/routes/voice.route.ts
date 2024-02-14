import express from 'express'
import { createVoiceCall, getVoiceCall } from '../controllers/voice.controller'
import verifyJwt from '../middlewares/verifyJwt'

const voiceRoute = express.Router()

voiceRoute.post('/', verifyJwt, createVoiceCall)
voiceRoute.get('/:videoId', verifyJwt, getVoiceCall)

export default voiceRoute
