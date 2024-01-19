import crypto from 'crypto'
import { type Request, type Response } from 'express'

import * as AuthService from '../services/auth.service'
import { logError, logInfo, logWarn } from '../utils/logger'
import { validRegister, validVerifyEmail } from '../validations/auth.validation'

import { type IVerifyEmailPayload, type IUser } from '../types/user.type'

export const register = async (req: Request, res: Response) => {
  const { value, error } = validRegister(req.body as IUser)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserExist = await AuthService.findUserByEmail(value.email)
    if (isUserExist) {
      logWarn(req, 'Email sudah terdaftar')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const token = crypto.randomBytes(3).toString('hex')
    value.password = AuthService.hashing(value.password).toString()
    await AuthService.addUser({ ...value, token })
    AuthService.sendVerifyEmail(value.email, token)

    logInfo(req, 'Akun anda berhasil terdaftar')
    return res.status(200).json({ message: 'Akun anda berhasil terdaftar' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { value, error } = validVerifyEmail(req.body as IVerifyEmailPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const checkToken = await AuthService.findUserByToken(value.token)
    if (!checkToken) {
      logWarn(req, 'Token sudah tidak berlaku')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    await AuthService.verifyUserEmail(checkToken.id)
    logInfo(req, 'Email berhasil diverifikasi')
    return res.status(200).json({ message: 'Email berhasil diverifikasi' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const login = async (req: Request, res: Response) => {}
