import express from 'express'
import { changePassword, getJoinedForums, getMe, getMyForums, updateMe } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.get('/', getMe)
userRoute.put('/', updateMe)
userRoute.get('/forums', getMyForums)
userRoute.get('/forums/joined', getJoinedForums)
userRoute.put('/change-password', changePassword)

export default userRoute
