import express from 'express'
import { register, verifyEmail } from '../controllers/auth.controller'

const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/verify-email', verifyEmail)

export default authRoute
