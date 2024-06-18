import express from 'express'
import {
  createValidateUser,
  getUserValidate,
  getUserValidates,
  updateValidateReadStatus,
  updateValidateUser
} from '../controllers/validate.controller'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const validateRoute = express.Router()

validateRoute.post('/', createValidateUser)
validateRoute.put('/:validateId', verifyJwt, verifyAdmin, updateValidateUser)
validateRoute.put('/:validateId/read', verifyJwt, verifyAdmin, updateValidateReadStatus)

validateRoute.get('/', verifyJwt, verifyAdmin, getUserValidates)
validateRoute.get('/userId', getUserValidate)

export default validateRoute
