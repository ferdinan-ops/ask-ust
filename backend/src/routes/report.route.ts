import express from 'express'
import { getReports } from '../controllers/report.controller'

const reportRoute = express.Router()

reportRoute.get('/:memberId/forum/:forumId', getReports)

export default reportRoute
