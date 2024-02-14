import express from 'express'
import { createVideoCall, getVideoCall } from '../controllers/video.controller'
import verifyJwt from '../middlewares/verifyJwt'

const videoRoute = express.Router()

videoRoute.post('/', verifyJwt, createVideoCall)
videoRoute.get('/:videoId', verifyJwt, getVideoCall)

export default videoRoute
