import { v4 } from 'uuid'
import { MemberRole } from '@prisma/client'

import db from '../utils/db'
import ENV from '../utils/environment'
import sendMail from '../middlewares/mailer'

import { type IForum } from '../types/forum.type'

export const addNewForum = async (payload: IForum & { userId: string }) => {
  const { userId, title, description } = payload

  return await db.forum.create({
    data: {
      user_id: userId,
      title,
      description,
      invite_code: v4(),
      members: {
        create: [{ user_id: userId, role: MemberRole.ADMIN }]
      }
    }
  })
}

export const deleteForumById = async (forumId: string, userId: string) => {
  return await db.forum.delete({ where: { id: forumId, user_id: userId } })
}

export const getForumsFromDB = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: { user: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }]
      }
    })
  ])

  return { data, count }
}

export const getForumById = async (forumId: string) => {
  return await db.forum.findUnique({
    where: { id: forumId },
    include: {
      members: {
        include: { user: true }
      }
    }
  })
}

export const addMemberToForum = async (forumId: string, userId: string) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      members: {
        create: [
          {
            user_id: userId
          }
        ]
      }
    }
  })
}

export const removeMemberFromForum = async (forumId: string, userId: string) => {
  return await db.forum.update({
    where: {
      id: forumId,
      user_id: {
        not: userId
      },
      members: {
        some: {
          user_id: userId
        }
      }
    },
    data: {
      members: {
        deleteMany: {
          user_id: userId
        }
      }
    }
  })
}

export const enabledVideoCall = async (forumId: string, memberId: string) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      video: {
        create: {
          is_enabled: true,
          member_id: memberId
        }
      }
    }
  })
}

export const sendVideoCallInvite = async (forumId: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      video: {
        include: {
          member: {
            include: {
              user: true
            }
          }
        }
      },
      members: {
        include: {
          user: true
        }
      }
    }
  })

  forum?.members.forEach((member) => {
    sendMail({
      to: member.user.email,
      subject: 'Panggilan Grup Video telah dimulai',
      html: `<p>Hai ${member.user.fullname}, </p><p>${forum?.video?.member.user.fullname} telah memulai panggilan video pada ${forum?.title}. Anda telah diundang untuk bergabung dengan panggilan video baru pada forum ini. Ayo klik <a href="${ENV.publicUrl}/forum/${forumId}/video">disini</a> untuk bergabung</p>`
    })
  })
}

export const enabledVoiceCall = async (forumId: string, memberId: string) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      voice: {
        create: {
          is_enabled: true,
          member_id: memberId
        }
      }
    }
  })
}

export const sendVoiceCallInvite = async (forumId: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      voice: {
        include: {
          member: {
            include: {
              user: true
            }
          }
        }
      },
      members: {
        include: {
          user: true
        }
      }
    }
  })

  forum?.members.forEach((member) => {
    sendMail({
      to: member.user.email,
      subject: 'Panggilan Grup Suara telah dimulai',
      html: `<p>Hai ${member.user.fullname}, </p><p>${forum?.voice?.member.user.fullname} telah memulai panggilan suara pada ${forum?.title}. Anda telah diundang untuk bergabung dengan panggilan suara baru pada forum ini. Ayo klik <a href="${ENV.publicUrl}/forum/${forumId}/voice">disini</a> untuk bergabung</p>`
    })
  })
}
