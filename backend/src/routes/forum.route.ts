import express from 'express'
import { createForum, deleteForum, getForum, getForums } from '../controllers/forum.controller'

const forumRoute = express.Router()

forumRoute.post('/', createForum)
forumRoute.delete('/:forumId', deleteForum)
forumRoute.get('/', getForums)
forumRoute.get('/:forumId', getForum)

export default forumRoute
