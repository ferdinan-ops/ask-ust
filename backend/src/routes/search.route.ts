import express from 'express'
import verifyJwt from '../middlewares/verifyJwt'
import { searchForum, searchMember, searchUser } from '../controllers/search.controller'

const searchRoute = express.Router()

searchRoute.get('/forums', verifyJwt, searchForum)
searchRoute.get('/members/:forumId', verifyJwt, searchMember)
searchRoute.get('/user', verifyJwt, searchUser)

export default searchRoute
