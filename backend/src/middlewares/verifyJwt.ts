import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

import ENV from '../utils/environment'
import { logWarn } from '../utils/logger'

interface DecodedToken {
  id: string
  iat: number
  exp: number
}

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    logWarn(req, 'Token is not provided')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  const decoded = jwt.verify(token, ENV.accessTokenSecret as string)
  const { id } = decoded as DecodedToken

  if (!decoded) {
    logWarn(req, 'Token is invalid/Forbidden')
    return res.status(403).json({ message: 'Forbidden' })
  }

  req.userId = id
  next()
}

export default verifyJwt
