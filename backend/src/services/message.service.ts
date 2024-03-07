import { userSelect } from '../utils/service'
import { type IMessageBody } from '../types/message.type'
import db from '../utils/db'
import ENV from '../utils/environment'

interface IMessagePayload extends IMessageBody {
  userId: string
}

const getMemberId = async (userId: string, forumId: string) => {
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

  return member?.id as string
}

export const addMessage = async (payload: IMessagePayload) => {
  const memberId = await getMemberId(payload.userId, payload.forumId)

  return await db.message.create({
    data: {
      content: payload.content,
      forum_id: payload.forumId,
      member_id: memberId
    }
  })
}

export const editMessage = async (messageId: string, payload: IMessagePayload) => {
  const memberId = await getMemberId(payload.userId, payload.forumId)

  return await db.message.update({
    where: {
      id: messageId,
      member_id: memberId
    },
    data: {
      content: payload.content
    }
  })
}

export const removeMessageFromDB = async (messageId: string, payload: Omit<IMessagePayload, 'content'>) => {
  const memberId = await getMemberId(payload.userId, payload.forumId)

  return await db.message.update({
    where: {
      id: messageId,
      member_id: memberId
    },
    data: {
      is_deleted: true,
      content: ''
    }
  })
}

export const getMessagesByForumId = async (forumId: string, limit?: number) => {
  return await db.message.findMany({
    take: limit ?? Number(ENV.messageBatch),
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
      created_at: 'asc'
    }
  })
}
