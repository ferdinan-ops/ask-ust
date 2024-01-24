import db from '../utils/db'

import { type IUserUpdatePayload } from '../types/user.type'
import { deleteFile, compressedFile } from '../utils/fileSettings'
import logger from '../utils/logger'

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

export const processPhoto = async (oldPhoto: string, filename: string) => {
  if (oldPhoto !== '') await deleteFile(oldPhoto)
  const compressedPhoto = await compressedFile(filename)
  if (compressedPhoto) {
    return compressedPhoto
  } else {
    logger.error('Gagal mengubah foto')
    return oldPhoto
  }
}

export const updatePhoto = async (userId: string, filename: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User tidak ditemukan')

  const oldPhoto = user.photo
  const newPhoto = await processPhoto(oldPhoto, filename)

  return await db.user.update({ where: { id: userId }, data: { photo: newPhoto } })
}
