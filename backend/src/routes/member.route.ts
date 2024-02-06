import express from 'express'

import verifyJwt from '../middlewares/verifyJwt'
import { getMember, getMembers, kickMember, reportMember, updateMember } from '../controllers/member.controller'

const memberRoute = express.Router()

memberRoute.get('/forum/:forumId', verifyJwt, getMembers)
memberRoute.get('/:memberId', verifyJwt, getMember)
memberRoute.post('/report', verifyJwt, reportMember)
memberRoute.put('/:memberId', verifyJwt, updateMember)
memberRoute.delete('/:memberId', verifyJwt, kickMember)

export default memberRoute
