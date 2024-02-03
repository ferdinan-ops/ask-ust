import express from 'express'
import {
  changeEmail,
  changePassword,
  changeProfilePicture,
  getJoinedForums,
  getMe,
  getMyForums,
  updateMe
} from '../controllers/user.controller'
import upload from '../middlewares/multer'
import verifyJwt from '../middlewares/verifyJwt'

const userRoute = express.Router()

userRoute.get('/', verifyJwt, getMe)
userRoute.put('/', verifyJwt, updateMe)
userRoute.get('/forums', verifyJwt, getMyForums)
userRoute.get('/forums/joined', verifyJwt, getJoinedForums)
userRoute.put('/change-password', verifyJwt, changePassword)
userRoute.put('/change-email', verifyJwt, changeEmail)
userRoute.put('/change-photo', upload.single('photo'), verifyJwt, changeProfilePicture)

export default userRoute
