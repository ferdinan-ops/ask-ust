import express from 'express'
import {
  changePassword,
  changeProfilePicture,
  getJoinedForums,
  getMe,
  getMyForums,
  updateMe
} from '../controllers/user.controller'
import upload from '../middlewares/multer'

const userRoute = express.Router()

userRoute.get('/', getMe)
userRoute.put('/', updateMe)
userRoute.get('/forums', getMyForums)
userRoute.get('/forums/joined', getJoinedForums)
userRoute.put('/change-password', changePassword)
userRoute.put('/change-photo', upload.single('photo'), changeProfilePicture)

export default userRoute
