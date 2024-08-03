/* eslint-disable @typescript-eslint/indent */
import { v4 } from 'uuid'
import { MemberRole } from '@prisma/client'

import db from '../utils/db'

import { type IForum } from '../types/forum.type'
import { userSelect } from '../utils/service'

export const addNewForum = async (payload: IForum & { userId: string }) => {
  const { userId, title, description } = payload

  return await db.forum.create({
    data: {
      user_id: userId,
      title: title as string,
      description,
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

export const getForumsFromDB = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: {
            user: userSelect
          },
          orderBy: { created_at: 'asc' }
        },
        _count: {
          select: { messages: true, members: true, reports: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
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
        include: {
          user: userSelect,
          reports: true
        },
        orderBy: { role: 'asc' }
      },
      _count: {
        select: { messages: true, members: true }
      }
    }
  })
}

export const addMemberToForum = async (forumId: string, userId: string) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      members: {
        create: [
          {
            user_id: userId
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
