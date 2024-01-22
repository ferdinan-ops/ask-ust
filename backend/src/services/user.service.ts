import db from '../utils/db'

import { type IUserUpdatePayload } from '../types/user.type'

export const getUserLogin = async (userId: string) => {
  return await db.user.findUnique({ where: { id: userId } })
}

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({ where: { username } })
}

export const updateUserById = async (userId: string, payload: IUserUpdatePayload) => {
  return await db.user.update({ where: { id: userId }, data: payload })
}

export const getUserLoginForums = async (userId: string, page: number, limit: number) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: { user: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({ where: { user_id: userId } })
  ])

  return { data, count }
}

export const getForumByMemberId = async (userId: string, page: number, limit: number) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        members: {
          some: {
            id: userId
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: { user: true }
        }
      }
    }),
    db.forum.count({
      where: {
        members: {
          some: {
            id: userId
          }
        }
      }
    })
  ])

  return { data, count }
}
