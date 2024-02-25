import db from '../utils/db'

import { type IUserUpdatePayload } from '../types/user.type'
import { deleteFile, compressedFile } from '../utils/fileSettings'
import logger from '../utils/logger'
import { userSelect } from '../utils/service'

export const getUserLogin = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      photo: true,
      provider: true,
      _count: { select: { forums: true } }
    }
  })
}

export const getUserJoinForumsCount = async (userId: string) => {
  return await db.forum.count({
    where: {
      members: {
        some: {
          user_id: userId,
          role: {
            in: ['GUEST', 'MODERATOR']
          }
        }
      }
    }
  })
}

export const getUserLoginForumsCount = async (userId: string) => {
  return await db.forum.count({ where: { user_id: userId } })
}

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({ where: { username } })
}

export const updateUserById = async (userId: string, payload: IUserUpdatePayload) => {
  return await db.user.update({
    where: { id: userId },
    data: payload,
    select: userSelect.select
  })
}

export const getUserLoginForums = async (userId: string, page: number, limit: number) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: { user: userSelect }
        },
        _count: {
          select: { messages: true, members: true }
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
            user_id: userId,
            role: {
              in: ['GUEST', 'MODERATOR']
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: { user: userSelect }
        },
        _count: {
          select: { messages: true, members: true }
        }
      }
    }),
    db.forum.count({
      where: {
        members: {
          some: {
            user_id: userId
          }
        }
      }
    })
  ])

  return { data, count }
}

export const processPhoto = async (oldPhoto: string, filename: string) => {
  console.log({ oldPhoto, filename })
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

  return await db.user.update({
    where: { id: userId },
    data: { photo: newPhoto },
    select: userSelect.select
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const updateEmail = async (userId: string, email: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { email, is_email_verified: false, token } })
}
