import db from '../utils/db'

import { IUser, type IUserUpdatePayload } from '../types/user.type'
import { userSelect } from '../utils/service'
import ENV from '../utils/environment'

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
      is_banned: true,
      banned_until: true,
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
          select: { messages: true, members: true, reports: true }
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

export const processPhoto = async (_oldPhoto: string, filename: string) => {
  // if (oldPhoto) await deleteFile(oldPhoto)
  return filename
}

export const updatePhoto = async (userId: string, filename: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User tidak ditemukan')

  const oldPhoto = user.photo
  const newPhoto = await processPhoto(oldPhoto, filename)

  return await db.user.update({
    where: { id: userId },
    data: { photo: newPhoto },
    select: {
      ...userSelect.select,
      validate: true
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const updateEmail = async (userId: string, email: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { email, is_email_verified: false, token } })
}

export const changeBannedStatus = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { banned_until: ENV.banOneDay, is_banned: true, banned_type: 'VIOLATION' }
  })
}

export const bannedUserEmail = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { is_banned: true, banned_type: 'QUIZ' }
  })
}

export const removeUserById = async (userId: string) => {
  return await db.user.delete({ where: { id: userId } })
}

export const fetchAdmins = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.user.findMany({
      where: {
        OR: [{ fullname: { contains: search } }, { username: { contains: search } }, { email: { contains: search } }],
        role: 'ADMIN'
      },
      skip: (page - 1) * limit,
      take: limit,
      select: userSelect.select,
      orderBy: { fullname: 'asc' }
    }),
    db.user.count({
      where: {
        OR: [{ fullname: { contains: search } }, { username: { contains: search } }, { email: { contains: search } }],
        role: 'ADMIN'
      }
    })
  ])

  return { data, count }
}

export const fetchAdminById = async (userId: string) => {
  return await db.user.findFirst({
    where: { role: 'ADMIN', id: userId },
    select: userSelect.select
  })
}

export const changeAdminById = async (userId: string, payload: IUser) => {
  return await db.user.update({
    where: { id: userId },
    data: payload
  })
}
