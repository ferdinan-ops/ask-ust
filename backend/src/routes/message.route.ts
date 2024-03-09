import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import {
  deleteMessage,
  deleteMessageBySpecificRole,
  getMessages,
  sendImage,
  sendMessage,
  updateMessage
} from '../controllers/message.controller'
import upload from '../middlewares/multer'

const messageRoute = express.Router()

messageRoute.get('/forum/:forumId', verifyJwt, getMessages)
messageRoute.post('/', verifyJwt, sendMessage)
messageRoute.post('/image', upload.single('image'), verifyJwt, sendImage)
messageRoute.put('/:messageId', verifyJwt, updateMessage)
messageRoute.delete('/:messageId/forum/:forumId', verifyJwt, deleteMessage)
messageRoute.delete('/:messageId/forum/:forumId/role', verifyJwt, deleteMessageBySpecificRole)

export default messageRoute
