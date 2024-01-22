import db from '../utils/db'
import uuid from 'uuid'

import { type IForum } from '../types/forum.type'
import { MemberRole } from '@prisma/client'

export const addNewForum = async (payload: IForum & { userId: string }) => {
  const { userId, title, description } = payload
  return await db.forum.create({
    data: {
      user_id: userId,
      title,
      description,
      invite_code: uuid.v4(),
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
          include: { user: true }
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
        include: { user: true }
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
