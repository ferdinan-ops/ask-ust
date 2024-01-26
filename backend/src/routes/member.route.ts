import express from 'express'

import verifyJwt from '../middlewares/verifyJwt'
import { getMembers, kickMember, reportMember, updateMember } from '../controllers/member.controller'

const memberRoute = express.Router()

memberRoute.get('/', verifyJwt, getMembers)
memberRoute.post('/report', verifyJwt, reportMember)
memberRoute.put('/:memberId', verifyJwt, updateMember)
memberRoute.delete('/:memberId', verifyJwt, kickMember)

export default memberRoute
