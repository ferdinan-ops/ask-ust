import express from 'express'
import { createVoiceCall, deleteVoiceCall, getEnabledVoiceCall, getVoiceCall } from '../controllers/voice.controller'
import verifyJwt from '../middlewares/verifyJwt'

const voiceRoute = express.Router()

voiceRoute.post('/', verifyJwt, createVoiceCall)
voiceRoute.delete('/:voiceId', verifyJwt, deleteVoiceCall)
voiceRoute.get('/:voiceId', verifyJwt, getVoiceCall)
voiceRoute.get('/forum/:forumId/enabled', verifyJwt, getEnabledVoiceCall)

export default voiceRoute
