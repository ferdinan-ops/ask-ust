import { userSelect } from '../utils/service'
import db from '../utils/db'

export const getForumByKeyword = async (keyword: string) => {
  return await db.forum.findMany({
    where: {
      title: {
        contains: keyword
      }
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
