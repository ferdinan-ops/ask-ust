import jwt from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

import ENV from '../utils/environment'
import { logWarn } from '../utils/logger'

interface DecodedToken {
  id: string
  isAdmin: boolean
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
  jwt.verify(token, ENV.accessTokenSecret as string, (error, decoded) => {
    if (error) {
      logWarn(req, 'Token is invalid/Forbidden')
      return res.status(403).json({ message: 'Forbidden' })
    }

    const { id, isAdmin } = decoded as DecodedToken

    req.userId = id
    req.isAdmin = isAdmin
    next()
  })
}

export const verifyUserRole = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    req.isAdmin = false
    next()
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, ENV.accessTokenSecret as string, (error, decoded) => {
      if (error) {
        logWarn(req, 'Token is invalid/Forbidden')
        return res.status(403).json({ message: 'Forbidden' })
      }

      const { id, isAdmin } = decoded as DecodedToken

      req.userId = id
      req.isAdmin = isAdmin
      next()
    })
  }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    logWarn(req, 'Unauthorized access')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

export default verifyJwt
