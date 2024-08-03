import { type Request, type Response } from 'express'
import { validMessage } from '../validations/message.validation'
import { type IMessageBody } from '../types/message.type'
import { logError, logInfo, logWarn } from '../utils/logger'

import * as MessageService from '../services/message.service'
import * as ViolationService from '../services/violation.service'
import ENV from '../utils/environment'

export const sendMessage = async (req: Request, res: Response) => {
  const userId = req.userId as string
  const { value, error } = validMessage(req.body as IMessageBody)

  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserBanned = await ViolationService.validateUser(userId)
    if (isUserBanned) {
      logError(req, 'User is banned')
      res.status(400).json({ error: ViolationService.bannedMessage })
    }

    const resultAnalysis = await MessageService.analyzeMessage(value.content)
    if (resultAnalysis.isToxic) {
      const violation = await ViolationService.handleViolations(userId, 'message')

      if (!violation.success) {
        logError(req, violation.error as string)
        return res.status(400).json({ error: violation.error })
      }
    }

    const data = await MessageService.addMessage({
      ...value,
      userId
    })

    const forumKey = `chat:${value.forumId}:messages`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Sending message')
    res.status(201).json({ message: 'Pesan berhasil dikirim', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMessage = async (req: Request, res: Response) => {
  if (!req.params?.messageId) {
    logError(req, 'Message id is not provided')
    return res.status(400).json({ error: 'Id pesan tidak diberikan' })
  }

  const messageId = req.params.messageId
  const userId = req.userId as string

  const { value, error } = validMessage(req.body as IMessageBody)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const member = await MessageService.getMemberInfo(userId, value.forumId)
    if (!member) {
      logError(req, 'Member not found')
      return res.status(404).json({ error: 'Member tidak dapat ditemukan' })
    }

    const data = await MessageService.editMessage(messageId, value.content)

    const forumKey = `chat:${value.forumId}:messages:update`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Editing message')
    res.status(200).json({ message: 'Pesan berhasil diubah', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  if (!req.params?.messageId) {
    logError(req, 'Message id is not provided')
    return res.status(400).json({ error: 'Id pesan tidak diberikan' })
  }

  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Id forum tidak diberikan' })
  }

  const messageId = req.params.messageId
  const forumId = req.params.forumId
  const userId = req.userId as string

  try {
    const data = await MessageService.removeMessageFromDB(messageId, {
      userId,
      forumId
    })

    const forumKey = `chat:${forumId}:messages:update`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Deleting message')
    res.status(200).json({ message: 'Pesan berhasil dihapus', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteMessageBySpecificRole = async (req: Request, res: Response) => {
  if (!req.params?.messageId) {
    logError(req, 'Message id is not provided')
    return res.status(400).json({ error: 'Id pesan tidak diberikan' })
  }

  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Id forum tidak diberikan' })
  }

  const messageId = req.params.messageId
  const forumId = req.params.forumId
  const userId = req.userId as string

  try {
    const member = await MessageService.getMemberInfo(userId, forumId)
    if (!member) {
      logError(req, 'Member not found')
      return res.status(404).json({ error: 'Member tidak dapat ditemukan' })
    }

    if (member.role === 'GUEST') {
      logError(req, 'Access Denied')
      return res.status(404).json({ error: 'Guest tidak dapat mengakses layanan ini' })
    }

    const data = await MessageService.removeMessageFromDB(messageId, {
      userId,
      forumId
    })

    const forumKey = `chat:${forumId}:messages:update`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Deleting message')
    res.status(200).json({ message: 'Pesan berhasil dihapus', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Id forum tidak diberikan' })
  }

  const { cursor } = req.query
  const forumId = req.params.forumId

  try {
    let data
    if (cursor) {
      data = await MessageService.getMessagesByCursor(forumId, cursor as string)
    } else {
      data = await MessageService.getMessagesByForumId(forumId)
    }

    let nextCursor = null
    if (data.length === Number(ENV.messageBatch)) {
      nextCursor = data[Number(ENV.messageBatch) - 1].id
    }

    logInfo(req, 'Getting messages')
    res.status(200).json({ message: 'Berhasil menampilkan seluruh pesan', data, next_cursor: nextCursor })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendImage = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file provided')
    return res.status(400).json({ error: 'Tidak ada file yang diberikan' })
  }

  if (!req.body.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Id forum tidak diberikan' })
  }

  const filename = req.file.filename
  const userId = req.userId as string
  const forumId = req.body.forumId as string

  try {
    const isUserBanned = await ViolationService.validateUser(userId)
    if (isUserBanned) {
      logError(req, 'User is banned')
      res.status(400).json({ error: ViolationService.bannedMessage })
    }

    const results = await MessageService.analyzeImage(filename)
    const isSecure = results && Object.values(results).every((value) => value === 'VERY_UNLIKELY')

    if (!isSecure) {
      const violation = await ViolationService.handleViolations(userId, 'image')

      if (!violation.success) {
        logError(req, violation.error as string)
        return res.status(400).json({ error: violation.error })
      }
    }

    const data = await MessageService.uploadImage(filename, forumId, userId)

    const forumKey = `chat:${forumId}:messages:update`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Sending image')
    res.status(201).json({ message: 'Gambar berhasil dikirim', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
