import { userSelect } from '../utils/service'
import db from '../utils/db'

export const getForumByKeyword = async (keyword: string, userId: string) => {
  return await db.forum.findMany({
    where: {
      OR: [
        { privacy: 'PUBLIC' }, // Mendapatkan forum publik
        // filter by search
        { title: { contains: keyword } },
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
    orderBy: {
      created_at: 'desc'
    }
  })
}

export const getMemberByKeyword = async (keyword: string, forumId: string) => {
  return await db.member.findMany({
    where: {
      forum_id: forumId,
      OR: [{ user: { username: { contains: keyword } } }, { user: { fullname: { contains: keyword } } }]
    },
    orderBy: {
      created_at: 'desc'
    },
    include: {
      user: userSelect
    }
  })
}

export const getUserByKeyword = async (keyword: string) => {
  return await db.user.findMany({
    where: {
      OR: [{ username: { contains: keyword } }, { fullname: { contains: keyword } }],
      role: 'USER'
    },
    select: {
      ...userSelect.select,
      members: true
    }
  })
}
