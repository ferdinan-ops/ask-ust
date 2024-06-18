import { Request, Response } from 'express'
import { logError, logInfo } from '../utils/logger'
import * as ValidateService from '../services/validate.service'
import { validUpdateValidate } from '../validations/validate.validation'
import { IValidateUpdatePayload } from '../types/validate.type'

export const createValidateUser = async (req: Request, res: Response) => {
  const userId = req.body.userId
  const file = req.files?.file
  const photo = req.files?.photo

  if (!userId) {
    logError(req, 'User ID is required')
    return res.status(400).json({ message: 'User ID is required' })
  }

  if (!file || !photo) {
    logError(req, 'File not found')
    return res.status(400).json({ message: 'File not found' })
  }

  try {
    await ValidateService.addNewValidate({
      user_id: userId,
      file: file.name,
      photo: photo.name
    })
    logInfo(req, 'Creating new validate user')
    res.status(201).json({ message: 'Berhasil menambahkan data verifikasi user' })
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

  try {
    await ValidateService.changeValidateStatus(req.params.validateId, value)
    logInfo(req, 'Updating validate user')
    res.status(200).json({ message: 'Berhasil mengubah status verifikasi user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUserValidates = async (req: Request, res: Response) => {
  try {
    const data = await ValidateService.fetchValidates()
    logInfo(req, 'Fetching all validates')
    res.status(200).json({ message: 'Berhasil menampilkan data verifikasi user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUserValidate = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const data = await ValidateService.fetchValidateByUserId(userId)
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
