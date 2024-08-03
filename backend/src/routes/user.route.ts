import express from 'express'
import {
  bannedUserFromApp,
  changeEmail,
  changePassword,
  changeProfilePicture,
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
  getJoinedForums,
  getMe,
  getMyForums,
  getProfileForumsCount,
  updateAdmin,
  updateMe
} from '../controllers/user.controller'
import upload from '../middlewares/multer'
import verifyJwt, { verifySuperAdmin, verifyUserRole } from '../middlewares/verifyJwt'

const userRoute = express.Router()

userRoute.get('/', verifyJwt, getMe)
userRoute.put('/', verifyJwt, updateMe)

userRoute.post('/banned/:userId', bannedUserFromApp)
userRoute.get('/forums', verifyJwt, getMyForums)
userRoute.get('/forums/joined', verifyJwt, getJoinedForums)
userRoute.get('/forums/count', verifyJwt, getProfileForumsCount)
userRoute.put('/change-password', verifyJwt, changePassword)
userRoute.put('/change-email', verifyJwt, changeEmail)
userRoute.put('/change-photo', upload.single('photo'), verifyJwt, changeProfilePicture)

userRoute.post('/admin', verifyJwt, verifyUserRole, verifySuperAdmin, createAdmin)
userRoute.delete('/admin/:userId', verifyJwt, verifyUserRole, verifySuperAdmin, deleteAdmin)
userRoute.put('/admin/:userId', verifyJwt, verifyUserRole, verifySuperAdmin, updateAdmin)
userRoute.get('/admin', verifyJwt, verifyUserRole, verifySuperAdmin, getAllAdmin)
userRoute.get('/admin/:userId', verifyJwt, verifyUserRole, verifySuperAdmin, getAdmin)

export default userRoute
