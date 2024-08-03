/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Request, Response } from 'express'
import { logError, logInfo } from '../utils/logger'
import * as ValidateService from '../services/validate.service'
import * as UserService from '../services/user.service'
import { validUpdateValidate } from '../validations/validate.validation'
import { IValidateUpdatePayload } from '../types/validate.type'

export const createValidateUser = async (req: Request, res: Response) => {
  const userId = req.body?.userId as string
  const agreement = req.body?.agreement as boolean
  const role = req.body?.role as string

  const file = req.files?.file
  const photo = req.files?.photo

  if (!userId) {
    logError(req, 'User ID is required')
    return res.status(400).json({ message: 'User ID is required' })
  }

  if (!role) {
    logError(req, 'Role is required')
    return res.status(400).json({ message: 'Role is required' })
  }

  if (!file?.[0].filename || !photo?.[0].filename) {
    logError(req, 'File not found')
    return res.status(400).json({ message: 'File not found' })
  }

  try {
    const validateUser = await ValidateService.fetchValidateByUserId(userId, true)
    if (validateUser.validate) {
      logError(req, 'User already has validate data')
      return res.status(400).json({ message: 'User already has validate data' })
    }

    let data
    const results = await ValidateService.addNewValidate({
      user_id: userId,
      role,
      file: file[0].filename,
      photo: photo[0].filename
    })

    if (results) {
      const { user, ...validate } = results
      data = { ...user, validate }
    }

    if (agreement) {
      data = await UserService.updatePhoto(userId, photo[0].filename)
      logInfo(req, 'Updating user photo')
    }

    await ValidateService.sendNotificationToAdmin(userId, results.user.fullname)

    logInfo(req, 'Creating new validate user')
    res.status(201).json({ message: 'Berhasil menambahkan data verifikasi user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateValidateUser = async (req: Request, res: Response) => {
  const { error, value } = validUpdateValidate(req.body as IValidateUpdatePayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ message: error.details[0].message })
  }

  if (!value.isValid && !value.note) {
    logError(req, 'Note is required when user is not valid')
    return res.status(400).json({ message: 'Note is required when user is not valid' })
  }

  if (value.isValid) value.note = ''

  try {
    const data = await ValidateService.changeValidateStatus(req.params.validateId, value)
    await ValidateService.sendValidateNotification(data.user.email, data.is_valid, data.note as string)
    logInfo(req, 'Updating validate user')
    res.status(200).json({ message: 'Berhasil mengubah status verifikasi user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUserValidates = async (req: Request, res: Response) => {
  const { page, limit, q, filter } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10
  const search = q as string
  const filterBy = filter as string

  try {
    const { data, count } = await ValidateService.fetchValidates(currentPage, perPage, search, filterBy)

    logInfo(req, 'Fetching all validates')
    res.status(200).json({
      message: 'Berhasil menampilkan data verifikasi user',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUserValidate = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const isAdmin = req.isAdmin

  try {
    let data
    if (isAdmin) {
      const result = await ValidateService.fetchValidateByUserId(userId)
      const { quiz, validate } = result as { quiz: any; validate: any }
      const { user, ...rest } = validate
      data = { ...user, validate: rest, quiz }
    } else {
      const result = await ValidateService.fetchValidateByUserId(userId, !isAdmin)
      if (!result.validate) {
        const user = await UserService.getUserLogin(userId)
        data = { ...user }
      } else {
        const { quiz, validate } = result as { quiz: any; validate: any }
        const { user, ...rest } = validate
        data = { ...user, validate: rest, quiz }
      }
    }

    logInfo(req, 'Fetching user validate')
    res.status(200).json({ message: 'Berhasil menampilkan data verifikasi user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateValidateReadStatus = async (req: Request, res: Response) => {
  const validateId = req.params.validateId

  try {
    await ValidateService.changeValidateReadStatus(validateId)
    logInfo(req, 'Updating validate read status')
    res.status(200).json({ message: 'Berhasil mengubah status baca verifikasi user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUnreadValidates = async (req: Request, res: Response) => {
  try {
    const data = await ValidateService.fetchUnreadValidatesCount()
    logInfo(req, 'Fetching unread validates')
    res.status(200).json({ message: 'Berhasil menampilkan data verifikasi user yang belum dibaca', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteValidateUser = async (req: Request, res: Response) => {
  const validateId = req.params.validateId

  try {
    const results = await ValidateService.removeValidateUser(validateId)

    let data
    if (results) {
      const { user, ...validate } = results
      data = { ...user, validate }
    }

    logInfo(req, 'Deleting validate user')
    res.status(200).json({ message: 'Berhasil menghapus data verifikasi user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendQuizRecord = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const quiz = req.body?.quiz as string

  if (!quiz) {
    logError(req, 'Quiz is required')
    res.status(400).json({ message: 'Url kuis harus diisi' })
  }

  try {
    const data = await ValidateService.uploadQuizRecord(userId, quiz)
    logInfo(req, 'Sending quiz record')
    res.status(200).json({ message: 'Berhasil mengirimkan data quiz', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
