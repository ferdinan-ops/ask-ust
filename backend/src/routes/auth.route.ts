import express from 'express'
import { login, loginGoogle, register, verifyEmail } from '../controllers/auth.controller'

const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/verify-email', verifyEmail)
authRoute.post('/login', login)
authRoute.post('/login-google', loginGoogle)

export default authRoute
