import db from '../utils/db'

export const getReportsFromDB = async (memberId: string, forumId: string) => {
  return await db.report.findMany({
    where: {
      member_id: memberId,
      forum_id: forumId
    },
    orderBy: {
      created_at: 'desc'
    }
  })
}
