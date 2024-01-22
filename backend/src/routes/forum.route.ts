import express from 'express'
import { createForum, deleteForum, getForum, getForums, joinForum, leaveForum } from '../controllers/forum.controller'

const forumRoute = express.Router()

forumRoute.get('/', getForums)
forumRoute.get('/:forumId', getForum)

forumRoute.post('/', createForum)
forumRoute.post('/join', joinForum)

forumRoute.delete('/leave', leaveForum)
forumRoute.delete('/:forumId', deleteForum)

export default forumRoute
