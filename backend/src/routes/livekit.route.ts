import express from 'express'
import { createToken } from '../controllers/livekit.controller'

const livekitRoute = express.Router()

livekitRoute.get('/', createToken)

export default livekitRoute
