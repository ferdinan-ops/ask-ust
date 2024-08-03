import { type IMessageBody } from '../types/message.type'
import db from '../utils/db'
import ENV from '../utils/environment'
import { userSelect } from '../utils/service'
import { compressedFile } from '../utils/fileSettings'

import vision from '@google-cloud/vision'
import path from 'path'
import axios from 'axios'

interface IMessagePayload extends IMessageBody {
  userId: string
}

const includedMessage = {
  member: {
    select: {
      user: userSelect
    }
  }
}

export const getMemberInfo = async (userId: string, forumId: string) => {
  const forum = await db.forum.findFirst({
    where: {
      id: forumId,
      members: {
        some: {
          user_id: userId
        }
      }
    },
    include: {
      members: true
    }
  })

  const member = forum?.members.find((member) => member.user_id === userId)

  return member
}

export const addMessage = async (payload: IMessagePayload) => {
  const member = await getMemberInfo(payload.userId, payload.forumId)

  return await db.message.create({
    data: {
      content: payload.content,
      forum_id: payload.forumId,
      member_id: member?.id as string
    },
    include: includedMessage
  })
}

export const editMessage = async (messageId: string, content: string) => {
  return await db.message.update({
    where: { id: messageId },
    data: { content },
    include: includedMessage
  })
}

export const removeMessageFromDB = async (messageId: string, payload: Omit<IMessagePayload, 'content'>) => {
  return await db.message.update({
    where: {
      id: messageId
    },
    data: {
      is_deleted: true,
      content: '',
      file_url: ''
    },
    include: includedMessage
  })
}

export const getMessagesByForumId = async (forumId: string) => {
  return await db.message.findMany({
    take: Number(ENV.messageBatch),
    where: {
      forum_id: forumId
    },
    include: {
      member: {
        select: {
          user: userSelect
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })
}

export const getMessagesByCursor = async (forumId: string, cursor: string) => {
  return await db.message.findMany({
    take: Number(ENV.messageBatch),
    skip: 1,
    cursor: {
      id: cursor
    },
    where: {
      forum_id: forumId
    },
    include: {
      member: {
        select: {
          user: userSelect
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })
}

export const processedImage = async (image: string) => {
  const compressedImage = await compressedFile(image)
  return compressedImage as string
}

export const analyzeImage = async (image: string) => {
  const imagePath = path.join(__dirname, '../../storage', image)

  const client = new vision.ImageAnnotatorClient({
    keyFilename: path.resolve('./keys.json')
  })

  const [safeSearch] = await client.safeSearchDetection(imagePath)

  return safeSearch.safeSearchAnnotation
}

export const analyzeMessage = async (message: string) => {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${ENV.perspectiveApiKey}`
  const response = await axios.post(url, {
    comment: {
      text: message
    },
    requestedAttributes: {
      TOXICITY: {}
    }
  })

  const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value

  if (toxicityScore >= 0.4) {
    return {
      isToxic: true,
      score: toxicityScore
    }
  }

  return {
    isToxic: false,
    score: toxicityScore
  }
}

export const uploadImage = async (image: string, forumId: string, userId: string) => {
  const member = await getMemberInfo(userId, forumId)
  return await db.message.create({
    data: {
      file_url: image,
      content: '',
      forum_id: forumId,
      member_id: member?.id as string
    },
    include: includedMessage
  })
}
