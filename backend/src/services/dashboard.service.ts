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

export const getReportsByForumId = async (forumId: string, userId: string) => {
  const members = await db.member.findFirst({
    where: {
      user_id: userId,
      forum_id: forumId
    }
  })

  return await db.report.findMany({
    where: {
      member_id: members?.id,
      forum_id: forumId
    }
  })
}

export const getForumsByUserId = async (userId: string) => {
  return await db.forum.findMany({
    where: {
      OR: [{ user_id: userId }, { members: { some: { user_id: userId } } }]
    },
    select: {
      id: true,
      title: true
    }
  })
}
