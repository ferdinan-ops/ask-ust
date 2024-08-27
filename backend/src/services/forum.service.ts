/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/indent */
import { v4 } from 'uuid'
import { MemberRole } from '@prisma/client'

import db from '../utils/db'

import { type IForum } from '../types/forum.type'
import { userSelect, userValidateSelect } from '../utils/service'
import ENV from '../utils/environment'
import logger from '../utils/logger'
import axios from 'axios'

export const addNewForum = async (payload: IForum & { userId: string }) => {
  const { userId, title, description, image, privacy } = payload

  return await db.forum.create({
    data: {
      user_id: userId,
      title: title as string,
      description,
      privacy,
      image: image ?? null,
      invite_code: v4(),
      members: {
        create: [{ user_id: userId, role: MemberRole.ADMIN }]
      }
    }
  })
}

export const deleteForumById = async (forumId: string, userId: string) => {
  return await db.forum.delete({ where: { id: forumId, user_id: userId } })
}

interface IGetParams {
  page: number
  limit: number
  search: string
}

export const getForumsFromDB = async ({ page, limit, search, userId }: IGetParams & { userId: string }) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        OR: [
          { privacy: 'PUBLIC' }, // Mendapatkan forum publik
          // filter by search
          // { title: { contains: search } },
          // { description: { contains: search } },
          {
            AND: [
              { privacy: 'PRIVATE' }, // Mendapatkan forum privat
              {
                OR: [
                  { user_id: userId }, // Forum yang dimiliki oleh user
                  { members: { some: { user_id: userId, is_accepted: true } } } // Forum yang user tersebut sudah menjadi anggota
                ]
              }
            ]
          }
        ]
      },
      include: {
        members: {
          where: {
            is_accepted: true
          },
          include: {
            user: userSelect
          },
          orderBy: { created_at: 'asc' }
        },
        _count: {
          select: {
            messages: true,
            members: {
              where: { is_accepted: true }
            },
            reports: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({
      where: {
        OR: [
          { privacy: 'PUBLIC' }, // Mendapatkan forum publik
          // filter by search
          { title: { contains: search } },
          { description: { contains: search } },
          {
            AND: [
              { privacy: 'PRIVATE' }, // Mendapatkan forum privat
              {
                OR: [
                  { user_id: userId }, // Forum yang dimiliki oleh user
                  { members: { some: { user_id: userId, is_accepted: true } } } // Forum yang user tersebut sudah menjadi anggota
                ]
              }
            ]
          }
        ]
      }
    })
  ])

  return { data, count }
}

export const getForumById = async (forumId: string) => {
  return await db.forum.findUnique({
    where: { id: forumId },
    include: {
      members: {
        where: {
          is_accepted: true
        },
        include: {
          user: userSelect,
          reports: true
        },
        orderBy: { role: 'asc' }
      },
      _count: {
        select: {
          messages: true,
          members: {
            where: { is_accepted: true }
          }
        }
      },
      user: {
        select: {
          ...userSelect.select,
          validate: userValidateSelect
        }
      }
    }
  })
}

interface IAddMemberParams {
  forumId: string
  userId: string
  status?: boolean
}

export const addMemberToForum = async ({ forumId, userId, status }: IAddMemberParams) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      members: {
        create: [
          {
            user_id: userId,
            is_accepted: status
          }
        ]
      }
    }
  })
}

export const updateForumById = async (forumId: string, userId: string, payload: IForum) => {
  return await db.forum.update({
    where: {
      id: forumId,
      user_id: userId
    },
    data: payload
  })
}

export const removeMemberFromForum = async (forumId: string, userId: string) => {
  return await db.forum.update({
    where: {
      id: forumId,
      user_id: {
        not: userId
      },
      members: {
        some: {
          user_id: userId
        }
      }
    },
    data: {
      members: {
        deleteMany: {
          user_id: userId
        }
      }
    }
  })
}

export const getForumByInviteCode = async (inviteCode: string) => {
  return await db.forum.findFirst({
    where: { invite_code: inviteCode },
    include: {
      members: true
    }
  })
}

export const isMemberAlreadyJoin = async (forumId: string, userId: string) => {
  return await db.forum.findFirst({
    where: {
      id: forumId,
      members: {
        some: {
          user_id: userId
        }
      }
    }
  })
}

export const fetchSummaryFromGeminiAi = async (forumId: string) => {
  try {
    const messages = await db.message.findMany({
      where: { forum_id: forumId },
      select: {
        content: true,
        forum: {
          select: {
            title: true
          }
        }
      }
    })

    const messagesPlainText = messages.map((message) => message.content).join('\n')

    const prompt = `Berikut adalah beberapa komentar dari sebuah forum yang berjudul ${messages?.[0].forum.title}. Buatlah dan kalkulasikan kesimpulan dari diskusi ini.\n\nKomentar:\n${messagesPlainText}`

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${ENV.geminiApiKey}`
    const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] })

    return response.data?.candidates?.[0]?.content.parts[0].text
  } catch (error) {
    logger.error(error)
  }
}
