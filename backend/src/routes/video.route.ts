import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import { createVideoCall, deleteVideoCall, getEnabledVideoCall, getVideoCall } from '../controllers/video.controller'

const videoRoute = express.Router()

videoRoute.post('/', verifyJwt, createVideoCall)
videoRoute.delete('/:videoId', verifyJwt, deleteVideoCall)
videoRoute.get('/:videoId', verifyJwt, getVideoCall)
videoRoute.get('/forum/:forumId/enabled', verifyJwt, getEnabledVideoCall)

export default videoRoute
