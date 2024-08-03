import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import { createMediaCall, deleteMediaCall, getEnabledMediaCall, getMediaCall } from '../controllers/media.controller'

const mediaRoute = express.Router()

mediaRoute.post('/', verifyJwt, createMediaCall)
mediaRoute.delete('/:mediaId', verifyJwt, deleteMediaCall)
mediaRoute.get('/:mediaId', verifyJwt, getMediaCall)
mediaRoute.get('/forum/:forumId/enabled', verifyJwt, getEnabledMediaCall)

export default mediaRoute
