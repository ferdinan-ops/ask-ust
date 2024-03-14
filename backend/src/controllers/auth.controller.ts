import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import ENV from '../utils/environment'
import * as AuthService from '../services/auth.service'
import { logError, logInfo, logWarn } from '../utils/logger'
import { validLogin, validRegister, validResetPassword, validVerifyEmail } from '../validations/auth.validation'

import {
  type IVerifyEmailPayload,
  type IUser,
  type ILoginPayload,
  type IResetPasswordPayload
} from '../types/user.type'

export const register = async (req: Request, res: Response) => {
  const { value, error } = validRegister(req.body as IUser)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserExist = await AuthService.findUserByEmail(value.email)
    if (isUserExist) {
      logWarn(req, 'Email is already registered')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const token = AuthService.generateToken()
    value.password = AuthService.hashing(value.password as string).toString()
    await AuthService.addUser({ ...value, token })
    AuthService.sendVerifyEmail(value.email, token)

    logInfo(req, 'User account has been registered')
    res.status(200).json({ message: 'Akun anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
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
      logWarn(req, 'Token is not valid')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    await AuthService.verifyUserEmail(checkToken.id)
    logInfo(req, 'Email has been verified')
    res.status(200).json({ message: 'Email berhasil diverifikasi' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const login = async (req: Request, res: Response) => {
  const { value, error } = validLogin(req.body as ILoginPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await AuthService.findUserByEmail(value.email)
    if (!user) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Email atau password Anda salah' })
    }

    const isValidPassword = AuthService.comparePassword(value.password as string, user.password)
    if (!isValidPassword) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Email atau password Anda salah' })
    }

    const accessToken = AuthService.accessTokenSign({ id: user.id })
    const refreshToken = AuthService.refreshTokenSign({ id: user.id })

    const { password, ...rest } = user
    const data = { user: rest, access_token: accessToken, refresh_token: refreshToken }

    logInfo(req, 'User is successfully logged in')
    res.status(200).json({ message: 'Login berhasil', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const loginGoogle = async (req: Request, res: Response) => {
  const { value, error } = validVerifyEmail(req.body as IVerifyEmailPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const googleRes = await AuthService.verifyGoogleToken(value.token)
    if (!googleRes) {
      logWarn(req, 'Token is not valid')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    const { name, email, picture } = googleRes
    let user = await AuthService.findUserByEmail(email)

    if (!user) {
      const username = `${AuthService.formatUsername(name)}-${AuthService.generateToken()}`
      user = await AuthService.addUser({
        fullname: name,
        username,
        email,
        token: '',
        photo: picture,
        is_email_verified: true
      })
    }

    const accessToken = AuthService.accessTokenSign({ id: user.id })
    const refreshToken = AuthService.refreshTokenSign({ id: user.id })

    const { password, ...rest } = user
    const data = { user: rest, access_token: accessToken, refresh_token: refreshToken }

    logInfo(req, 'User is successfully logged in')
    res.status(200).json({ message: 'Login berhasil', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    logWarn(req, 'Email is not provided')
    return res.status(400).json({ error: 'Email tidak tersedia' })
  }

  try {
    const user = await AuthService.findUserByEmail(email as string)
    if (!user) {
      logWarn(req, 'Email is not registered')
      return res.status(400).json({ error: 'Email tidak terdaftar' })
    }

    const token = AuthService.generateToken()
    await AuthService.updateUserToken(user.id, token)
    AuthService.sendForgotPasswordEmail(email as string, token)

    logInfo(req, 'Email has been sent')
    res.status(200).json({ message: 'Email berhasil dikirim' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  const { value, error } = validResetPassword(req.body as IResetPasswordPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await AuthService.findUserByToken(value.token)
    if (!user) {
      logWarn(req, 'Token is not valid')
      return res.status(400).json({ error: 'Token sudah tidak berlaku' })
    }

    const hashedPassword = AuthService.hashing(value.password)
    await AuthService.updateUserPassword(user.id, hashedPassword)

    logInfo(req, 'Password has been reset')
    res.status(200).json({ message: 'Password berhasil direset' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    logInfo(req, 'User is successfully logged out')
    res.clearCookie('ask-ust-refresh-token')
    res.status(200).json({ message: 'Berhasil logout' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body?.refresh_token
  if (!refreshToken) {
    logWarn(req, 'Refresh token is not provided')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    jwt.verify(refreshToken as string, ENV.refreshTokenSecret as string, async (error, decoded) => {
      const { id } = decoded as { id: string }
      if (error) {
        logError(req, 'Refresh token is invalid/Forbidden')
        return res.status(403).json({ error: 'Forbidden' })
      }

      const user = await AuthService.findUserById(id)
      if (!user) {
        logWarn(req, 'User is not found')
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const accessToken = AuthService.accessTokenSign({ id: user.id })
      const data = { user, access_token: accessToken, refresh_token: refreshToken }

      logInfo(req, 'Access token is successfully refreshed')
      res.status(200).json({ message: 'Access token berhasil diperbarui', data })
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
