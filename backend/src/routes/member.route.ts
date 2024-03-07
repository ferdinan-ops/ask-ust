import express from 'express'

import verifyJwt from '../middlewares/verifyJwt'
import {
  getMember,
  getMemberLogin,
  getMembers,
  kickMember,
  reportMember,
  updateMember
} from '../controllers/member.controller'

const memberRoute = express.Router()

memberRoute.get('/forum/:forumId', verifyJwt, getMembers)
memberRoute.get('/:memberId', verifyJwt, getMember)
memberRoute.get('/forum/:forumId/detail', verifyJwt, getMemberLogin)
memberRoute.post('/report', verifyJwt, reportMember)
memberRoute.put('/:memberId', verifyJwt, updateMember)
memberRoute.delete('/:memberId/forum/:forumId', verifyJwt, kickMember)

export default memberRoute
