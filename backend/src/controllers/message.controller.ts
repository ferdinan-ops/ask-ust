import { type Request, type Response } from 'express'
import { validMessage } from '../validations/message.validation'
import { type IMessageBody } from '../types/message.type'
import { logError, logInfo } from '../utils/logger'

import * as MessageService from '../services/message.service'

export const sendMessage = async (req: Request, res: Response) => {
  const { value, error } = validMessage(req.body as IMessageBody)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await MessageService.addMessage({
      ...value,
      userId: req.userId as string
    })

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
  const { value, error } = validMessage(req.body as IMessageBody)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await MessageService.editMessage(messageId, {
      ...value,
      userId: req.userId as string
    })

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

  const { limit } = req.query
  const forumId = req.params.forumId

  try {
    const data = await MessageService.getMessagesByForumId(forumId, Number(limit))

    logInfo(req, 'Getting messages')
    res.status(200).json({ message: 'Berhasil menampilkan seluruh pesan', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
