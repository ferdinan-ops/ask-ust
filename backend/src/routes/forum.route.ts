import express from 'express'

import {
  createForum,
  deleteForum,
  getForum,
  getForumConclusion,
  getForums,
  joinForum,
  joinForumWithInviteCode,
  leaveForum,
  updateForum
} from '../controllers/forum.controller'
import verifyJwt from '../middlewares/verifyJwt'
import upload from '../middlewares/multer'

const forumRoute = express.Router()

forumRoute.get('/', verifyJwt, getForums)
forumRoute.get('/:forumId', verifyJwt, getForum)
forumRoute.get('/:forumId/summary', verifyJwt, getForumConclusion)

forumRoute.post('/', verifyJwt, upload.single('image'), createForum)
forumRoute.post('/join', verifyJwt, joinForum)
forumRoute.post('/leave', verifyJwt, leaveForum)
forumRoute.post('/invite-code', verifyJwt, joinForumWithInviteCode)

forumRoute.delete('/:forumId', verifyJwt, deleteForum)

forumRoute.put('/:forumId', verifyJwt, upload.single('image'), updateForum)

export default forumRoute
