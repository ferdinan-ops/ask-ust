import express from 'express'
import { getMembersCount, getReportsCount, getReportsCountByForum } from '../controllers/dashboard.controller'
import verifyJwt from '../middlewares/verifyJwt'

const dashboardRoute = express.Router()

dashboardRoute.get('/reports/count', verifyJwt, getReportsCount)
dashboardRoute.get('/members/count', verifyJwt, getMembersCount)
dashboardRoute.get('/reports/count/:forumId', verifyJwt, getReportsCountByForum)

export default dashboardRoute
