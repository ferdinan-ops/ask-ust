import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import { deleteMessage, getMessages, sendMessage, updateMessage } from '../controllers/message.controller'

const messageRoute = express.Router()

messageRoute.get('/forum/:forumId', verifyJwt, getMessages)
messageRoute.post('/', verifyJwt, sendMessage)
messageRoute.put('/:messageId', verifyJwt, updateMessage)
messageRoute.delete('/:messageId/forum/:forumId', verifyJwt, deleteMessage)

export default messageRoute
