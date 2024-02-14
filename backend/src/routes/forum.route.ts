import express from 'express'

import {
  createForum,
  createVideoCall,
  createVoiceCall,
  deleteForum,
  getForum,
  getForums,
  joinForum,
  joinForumWithInviteCode,
  leaveForum,
  updateForum
} from '../controllers/forum.controller'
import verifyJwt from '../middlewares/verifyJwt'

const forumRoute = express.Router()

forumRoute.get('/', verifyJwt, getForums)
forumRoute.get('/:forumId', verifyJwt, getForum)

forumRoute.post('/', verifyJwt, createForum)
forumRoute.post('/join', verifyJwt, joinForum)
forumRoute.post('/leave', verifyJwt, leaveForum)
forumRoute.post('/invite-code', verifyJwt, joinForumWithInviteCode)

forumRoute.delete('/:forumId', verifyJwt, deleteForum)

forumRoute.put('/:forumId', verifyJwt, updateForum)
forumRoute.put('/video/:forumId', verifyJwt, createVideoCall)
forumRoute.put('/voice/:forumId', verifyJwt, createVoiceCall)

export default forumRoute
