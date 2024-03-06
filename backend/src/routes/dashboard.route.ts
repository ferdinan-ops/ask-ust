import express from 'express'
import { getReportsByForum, getDashboardCounts, getForumsUser } from '../controllers/dashboard.controller'
import verifyJwt from '../middlewares/verifyJwt'

const dashboardRoute = express.Router()

dashboardRoute.get('/count', verifyJwt, getDashboardCounts)
dashboardRoute.get('/forums', verifyJwt, getForumsUser)
dashboardRoute.get('/forums/:forumId/reports', verifyJwt, getReportsByForum)

export default dashboardRoute
