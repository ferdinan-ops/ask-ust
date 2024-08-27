import express from 'express'

import verifyJwt from '../middlewares/verifyJwt'
import {
  createMember,
  getMember,
  getMemberLogin,
  getMembers,
  getRequestedMembers,
  kickMember,
  reportMember,
  updateMember,
  updateMemberStatus
} from '../controllers/member.controller'

const memberRoute = express.Router()

memberRoute.get('/forum/:forumId', verifyJwt, getMembers)
memberRoute.get('/forum/:forumId/requested', verifyJwt, getRequestedMembers)
memberRoute.get('/forum/:forumId/detail', verifyJwt, getMemberLogin)

memberRoute.post('/', verifyJwt, createMember)

memberRoute.get('/:memberId', verifyJwt, getMember)
memberRoute.put('/:memberId', verifyJwt, updateMember)
memberRoute.put('/:memberId/status', verifyJwt, updateMemberStatus)
memberRoute.delete('/:memberId/forum/:forumId', verifyJwt, kickMember)

memberRoute.post('/report', verifyJwt, reportMember)

export default memberRoute
