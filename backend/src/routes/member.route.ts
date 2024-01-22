import express from 'express'
import { getMembers, kickMember, reportMember, updateMember } from '../controllers/member.controller'

const memberRoute = express.Router()

memberRoute.get('/', getMembers)
memberRoute.post('/report', reportMember)
memberRoute.put('/:memberId', updateMember)
memberRoute.delete('/:memberId', kickMember)

export default memberRoute
