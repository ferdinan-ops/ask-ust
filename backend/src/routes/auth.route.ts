import express from 'express'
import { register } from '../controllers/auth.controller'

const authRoute = express.Router()

authRoute.post('/register', register)

export default authRoute
