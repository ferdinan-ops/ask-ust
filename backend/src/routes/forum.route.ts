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
  updateForum,
  updateForumType
} from '../controllers/forum.controller'
import verifyJwt, { verifyAdmin, verifyUserRole } from '../middlewares/verifyJwt'
import upload from '../middlewares/multer'

const forumRoute = express.Router()

forumRoute.get('/', verifyJwt, verifyUserRole, getForums)
forumRoute.get('/:forumId', verifyJwt, verifyUserRole, getForum)
forumRoute.get('/:forumId/summary', verifyJwt, getForumConclusion)

forumRoute.post('/', verifyJwt, upload.single('image'), createForum)
forumRoute.post('/join', verifyJwt, joinForum)
forumRoute.post('/leave', verifyJwt, leaveForum)
forumRoute.post('/invite-code', verifyJwt, joinForumWithInviteCode)

forumRoute.delete('/:forumId', verifyJwt, deleteForum)

forumRoute.put('/:forumId', verifyJwt, upload.single('image'), updateForum)
forumRoute.put('/:forumId/type', verifyJwt, verifyAdmin, updateForumType)

export default forumRoute
