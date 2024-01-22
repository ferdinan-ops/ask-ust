import express from 'express'
import {
  createForum,
  createVideoCall,
  createVoiceCall,
  deleteForum,
  getForum,
  getForums,
  joinForum,
  leaveForum
} from '../controllers/forum.controller'

const forumRoute = express.Router()

forumRoute.get('/', getForums)
forumRoute.get('/:forumId', getForum)

forumRoute.post('/', createForum)
forumRoute.post('/join', joinForum)

forumRoute.delete('/leave', leaveForum)
forumRoute.delete('/:forumId', deleteForum)

forumRoute.put('/video/:forumId', createVideoCall)
forumRoute.put('/voice/:forumId', createVoiceCall)

export default forumRoute
