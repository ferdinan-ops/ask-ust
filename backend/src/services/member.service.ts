/* eslint-disable @typescript-eslint/indent */
import { userSelect } from '../utils/service'
import { type IUpdateMemberParams, type IMembersParams, type IReportMemberPayload } from '../types/member.type'

import db from '../utils/db'

const optionsSearchMember = (search: string) => {
  return [{ user: { username: { contains: search } } }, { user: { fullname: { contains: search } } }]
}

export const getMembersByForumId = async ({ forumId, page, limit, search }: IMembersParams) => {
  const [data, count] = await db.$transaction([
    db.member.findMany({
      where: {
        forum_id: forumId,
        OR: optionsSearchMember(search)
      },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: userSelect }
    }),
    db.member.count({
      where: {
        forum_id: forumId,
        OR: optionsSearchMember(search)
      }
    })
  ])

  return { data, count }
}

export const removeMember = async (memberId: string, forumId: string, userId: string) => {
  return await db.forum.update({
    where: {
      id: forumId,
      user_id: userId
    },
    data: {
      members: {
        deleteMany: {
          id: memberId,
          user_id: {
            not: userId
          }
        }
      }
    }
  })
}

export const updateMemberRole = async ({ memberId, forumId, role, userId }: IUpdateMemberParams) => {
  return await db.forum.update({
    where: { id: forumId, user_id: userId },
    data: {
      members: {
        update: {
          where: { id: memberId, user_id: { not: userId } },
          data: { role }
        }
      }
    }
  })
}

export const getMemberByUserIdAndForumId = async (userId: string, forumId: string) => {
  return await db.forum.findUnique({
    where: { id: forumId },
    include: {
      members: {
        where: { user_id: userId }
      }
    }
  })
}

export const addReport = async (payload: IReportMemberPayload) => {
  return await db.forum.update({
    where: { id: payload.forum_id },
    data: {
      members: {
        update: {
          where: { id: payload.member_id },
          data: {
            reports: {
              create: {
                report_category: payload.report_category,
                forum_id: payload.forum_id
              }
            }
          }
        }
      }
    }
  })
}
