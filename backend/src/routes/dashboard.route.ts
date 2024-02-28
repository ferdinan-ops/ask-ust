import express from 'express'
import { getMembersCount, getReportsCount } from '../controllers/dashboard.controller'
import verifyJwt from '../middlewares/verifyJwt'

const dashboardRoute = express.Router()

dashboardRoute.get('/reports/count', verifyJwt, getReportsCount)
dashboardRoute.get('/members/count', verifyJwt, getMembersCount)

export default dashboardRoute
