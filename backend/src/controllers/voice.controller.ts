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

    logInfo(req, 'Creating voice call')
    res.status(200).json({ message: 'Berhasil membuat voice call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getVoiceCall = async (req: Request, res: Response) => {
  const voiceId = req.params?.voiceId

  try {
    const data = await VoiceService.getVoiceCallById(voiceId)

    console.log({ data })

    logInfo(req, 'Getting voice call')
    res.status(200).json({ message: 'Berhasil mendapatkan voice call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
