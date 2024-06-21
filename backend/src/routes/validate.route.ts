import express from 'express'
import {
  createValidateUser,
  deleteValidateUser,
  getUnreadValidates,
  getUserValidate,
  getUserValidates,
  updateValidateReadStatus,
  updateValidateUser
} from '../controllers/validate.controller'
import verifyJwt, { verifyAdmin, verifyUserRole } from '../middlewares/verifyJwt'
import upload from '../middlewares/multer'

const validateRoute = express.Router()

validateRoute.post(
  '/',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
  ]),
  createValidateUser
)
validateRoute.delete('/:validateId', deleteValidateUser)
validateRoute.put('/:validateId', verifyJwt, verifyAdmin, updateValidateUser)
validateRoute.put('/:validateId/read', verifyJwt, verifyAdmin, updateValidateReadStatus)

validateRoute.get('/', verifyJwt, verifyAdmin, getUserValidates)
validateRoute.get('/user/:userId', verifyUserRole, getUserValidate)
validateRoute.get('/notif', verifyJwt, verifyAdmin, getUnreadValidates)

export default validateRoute
