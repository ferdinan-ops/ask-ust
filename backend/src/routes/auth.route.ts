import express from 'express'
import {
  forgotPassword,
  login,
  loginGoogle,
  logout,
  refreshToken,
  register,
  resetPassword,
  verifyEmail
} from '../controllers/auth.controller'
import verifyJwt from '../middlewares/verifyJwt'

const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/verify-email', verifyEmail)
authRoute.post('/login', login)
authRoute.post('/google', loginGoogle)
authRoute.post('/forgot-password', forgotPassword)
authRoute.post('/reset-password', resetPassword)
authRoute.delete('/logout', verifyJwt, logout)
authRoute.post('/refresh', refreshToken)

export default authRoute
