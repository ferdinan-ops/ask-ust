import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import { searchForum, searchMember } from '../controllers/search.controller'

const searchRoute = express.Router()

searchRoute.get('/forums', verifyJwt, searchForum)
searchRoute.get('/members/:forumId', verifyJwt, searchMember)

export default searchRoute
