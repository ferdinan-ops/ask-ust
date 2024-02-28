import db from '../utils/db'

export const getReportsCountByUserId = async (userId: string) => {
  const members = await db.member.findMany({
    where: {
      user_id: userId
    }
  })

  const reports = await db.report.findMany({
    where: {
      member_id: {
        in: members.map((member) => member.id)
      }
    }
  })

  return reports.length
}

export const getAllMembersOnMyForumsCount = async (userId: string) => {
  const forums = await db.forum.findMany({
    where: {
      user_id: userId
    }
  })

  const members = await db.member.findMany({
    where: {
      forum_id: {
        in: forums.map((forum) => forum.id)
      }
    }
  })

  return members.length
}
