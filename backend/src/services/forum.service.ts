import db from '../utils/db'

import { type IForum } from '../types/forum.type'

export const addNewForum = async (payload: IForum & { user_id: string }) => {
  return await db.forum.create({ data: payload })
}

export const deleteForumById = async (forumId: string) => {
  return await db.forum.delete({ where: { id: forumId } })
}

export const getForumsFromDB = async (page: string, limit: string) => {
  return await db.forum.findMany({
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit)
  })
}

export const getForumsCount = async () => {
  return await db.forum.count()
}

export const getForumById = async (forumId: string) => {
  return await db.forum.findUnique({ where: { id: forumId } })
}
