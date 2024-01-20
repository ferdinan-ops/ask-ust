import express from 'express'
import {
  forgotPassword,
  login,
  loginGoogle,
  logout,
  register,
  resetPassword,
  verifyEmail
} from '../controllers/auth.controller'

const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/verify-email', verifyEmail)
authRoute.post('/login', login)
authRoute.post('/google', loginGoogle)
authRoute.post('/forgot-password', forgotPassword)
authRoute.post('/reset-password', resetPassword)
authRoute.post('/logout', logout)

export default authRoute
