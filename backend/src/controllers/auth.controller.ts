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
      if (isUserExist.banned_type === 'QUIZ') {
        logWarn(req, 'User is banned')
        return res.status(400).json({ error: 'Email ini telah diblokir dari aplikasi kami' })
      }

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
      return res.status(400).json({ error: 'Kode verifikasi sudah tidak berlaku' })
    }

    const user = await AuthService.verifyUserEmail(checkToken.id)
    logInfo(req, 'Email has been verified')
    res.status(200).json({ message: 'Email berhasil diverifikasi', data: user })
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

    if (user.banned_type === 'QUIZ') {
      logWarn(req, 'User is banned')
      return res.status(400).json({ error: 'Email ini telah diblokir dari aplikasi kami' })
    }

    const isValidPassword = AuthService.comparePassword(value.password as string, user.password)
    if (!isValidPassword) {
      logWarn(req, 'Email or password is wrong')
      return res.status(400).json({ error: 'Email atau password Anda salah' })
    }

    const { password, ...userWithoutPassword } = user
    const { validate, ...rest } = userWithoutPassword

    if (user.role !== 'USER') {
      const accessToken = AuthService.accessTokenSign({ id: user.id, isAdmin: true, role: user.role })
      const refreshToken = AuthService.refreshTokenSign({ id: user.id, isAdmin: true, role: user.role })

      const data = { user: rest, access_token: accessToken, refresh_token: refreshToken }

      logInfo(req, 'Admin is successfully logged in')
      return res.status(200).json({ message: 'Login berhasil', data })
    }

    if (!user.validate) {
      logWarn(req, 'Data has not been sent to Admin')
      return res.status(200).json({ data: { user: rest } })
    }

    if (validate?.note ?? !validate?.is_valid ?? !validate?.note) {
      logWarn(req, 'Data has been sent to Admin')
      return res.status(200).json({ data: { user: userWithoutPassword } })
    }

    const accessToken = AuthService.accessTokenSign({ id: user.id, isAdmin: false, role: user.role })
    const refreshToken = AuthService.refreshTokenSign({ id: user.id, isAdmin: false, role: user.role })

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
      return res.status(400).json({ error: 'Kode verifikasi tidak berlaku' })
    }

    const { name, email, picture } = googleRes
    const user = await AuthService.findUserByEmail(email)

    if (!user) {
      const token = AuthService.generateToken()
      const username = `${AuthService.formatUsername(name)}-${token}`
      const results = await AuthService.addUser({
        fullname: name,
        username,
        token,
        email,
        photo: picture,
        is_email_verified: true,
        provider: 'google'
      })

      logInfo(req, 'User is successfully logged in')
      return res.status(200).json({ message: 'Login berhasil', data: { user: results } })
    }

    if (user.banned_type === 'QUIZ') {
      logWarn(req, 'User is banned')
      return res.status(400).json({ error: 'Email ini telah diblokir dari aplikasi kami' })
    }

    const { password, ...userWithoutPassword } = user
    const { validate, ...rest } = userWithoutPassword

    if (user.role !== 'USER') {
      const accessToken = AuthService.accessTokenSign({ id: user.id, isAdmin: true, role: user.role })
      const refreshToken = AuthService.refreshTokenSign({ id: user.id, isAdmin: true, role: user.role })

      const data = { user: rest, access_token: accessToken, refresh_token: refreshToken }

      logInfo(req, 'Admin is successfully logged in')
      return res.status(200).json({ message: 'Login berhasil', data })
    }

    if (!user.validate) {
      logWarn(req, 'Data has not been sent to Admin')
      return res.status(200).json({
        message: 'Data pengguna belum dikirim ke admin',
        data: { user: rest }
      })
    }

    if (validate?.note ?? !validate?.is_valid ?? !validate?.note) {
      logWarn(req, 'Data Quiz has been sent to Admin')
      return res.status(200).json({
        data: {
          message: 'Data Quiz pengguna belum dikirim ke admin',
          user: userWithoutPassword
        }
      })
    }

    const accessToken = AuthService.accessTokenSign({ id: user.id, isAdmin: false, role: user.role })
    const refreshToken = AuthService.refreshTokenSign({ id: user.id, isAdmin: false, role: user.role })

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

    if (user.banned_type === 'QUIZ') {
      logWarn(req, 'User is banned')
      return res.status(400).json({ error: 'Email ini telah diblokir dari aplikasi kami' })
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
      return res.status(400).json({ error: 'Kode verifikasi sudah tidak berlaku' })
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
      const results = decoded as { id?: string }
      if (error ?? !results?.id) {
        logError(req, 'Refresh token is invalid/Forbidden')
        return res.status(403).json({ error: 'Forbidden' })
      }

      const user = await AuthService.findUserById(results?.id)
      if (!user) {
        logWarn(req, 'User is not found')
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const accessToken = AuthService.accessTokenSign({ id: user.id, isAdmin: false, role: user.role })
      const data = { user, access_token: accessToken, refresh_token: refreshToken }

      logInfo(req, 'Access token is successfully refreshed')
      res.status(200).json({ message: 'Access token berhasil diperbarui', data })
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
