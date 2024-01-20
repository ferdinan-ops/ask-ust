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
  return await db.forum.findMany({
    where: { user_id: userId },
    skip: (page - 1) * limit,
    take: limit
  })
}

export const getUserLoginForumsCount = async (userId: string) => {
  return await db.forum.count({ where: { user_id: userId } })
}

export const getForumByMemberId = async (userId: string, page: number, limit: number) => {
  return await db.forum.findMany({
    where: {
      members: {
        some: {
          id: userId
        }
      }
    },
    skip: (page - 1) * limit,
    take: limit
  })
}

export const getForumByMemberIdCount = async (userId: string) => {
  return await db.forum.count({
    where: {
      members: {
        some: {
          id: userId
        }
      }
    }
  })
}
