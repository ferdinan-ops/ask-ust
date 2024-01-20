import express from 'express'
import { getJoinedForums, getMe, getMyForums, updateMe } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.get('/', getMe)
userRoute.put('/', updateMe)
userRoute.get('/forums', getMyForums)
userRoute.get('/forums/joined', getJoinedForums)

export default userRoute
