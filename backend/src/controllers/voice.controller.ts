import { type Request, type Response } from 'express'
import { logError, logInfo } from '../utils/logger'
import * as VoiceService from '../services/voice.service'

export const createVoiceCall = async (req: Request, res: Response) => {
  const forumId = req.body?.forumId as string
  const memberId = req.userId as string

  if (!forumId) {
    logError(req, 'Forum id is required')
    return res.status(400).json({ message: 'Forum id is required' })
  }

  try {
    const data = await VoiceService.enabledVoiceCall(forumId, memberId)
    await VoiceService.sendVoiceCallInvite(forumId)

    const forumKey = `voice:${forumId}:enabled`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Creating voice call')
    res.status(200).json({ message: 'Berhasil membuat voice call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteVoiceCall = async (req: Request, res: Response) => {
  const voiceId = req.params?.voiceId
  const userId = req.userId as string

  try {
    const isVoiceCallExist = await VoiceService.getVoiceCallById(voiceId)
    if (!isVoiceCallExist) {
      logError(req, 'Voice call not found')
      return res.status(404).json({ error: 'Voice call tidak ditemukan' })
    }

    const data = await VoiceService.removeVoiceCallById(voiceId, userId)

    const forumKey = `voice:${isVoiceCallExist.forum_id}:disabled`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Deleting voice call')
    res.status(200).json({ message: 'Berhasil menghapus voice call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getVoiceCall = async (req: Request, res: Response) => {
  const voiceId = req.params?.voiceId

  try {
    const data = await VoiceService.getVoiceCallById(voiceId)

    logInfo(req, 'Getting voice call')
    res.status(200).json({ message: 'Berhasil mendapatkan voice call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getEnabledVoiceCall = async (req: Request, res: Response) => {
  const forumId = req.params?.forumId

  try {
    const data = await VoiceService.getEnabledVoiceCallByForumId(forumId)
    if (!data) {
      logError(req, 'Voice call not found')
      return res.status(404).json({ error: 'Voice call tidak ditemukan' })
    }

    logInfo(req, 'Getting enabled voice call')
    res.status(200).json({ message: 'Berhasil mendapatkan voice call yang aktif', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
