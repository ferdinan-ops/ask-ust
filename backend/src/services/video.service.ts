import db from '../utils/db'
import ENV from '../utils/environment'
import sendMail from '../middlewares/mailer'
import { userSelect } from '../utils/service'

const videoInclude = {
  member: {
    include: {
      user: userSelect
    }
  }
}

export const enabledVideoCall = async (forumId: string, userId: string) => {
  const member = await db.member.findFirst({
    where: {
      forum_id: forumId,
      user_id: userId
    }
  })

  const forum = await db.forum.update({
    where: { id: forumId },
    data: {
      video: {
        create: {
          is_enabled: true,
          member_id: member?.id as string
        }
      }
    },
    include: {
      video: {
        include: videoInclude
      }
    }
  })

  return forum.video
}

export const sendVideoCallInvite = async (forumId: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      video: {
        include: {
          member: {
            include: {
              user: userSelect
            }
          }
        }
      },
      members: {
        include: {
          user: userSelect
        }
      }
    }
  })

  forum?.members.forEach((member) => {
    sendMail({
      to: member.user.email,
      subject: 'Panggilan Grup Video telah dimulai',
      html: `<p>Hai ${member.user.fullname}, </p><p>${forum?.video?.member.user.fullname} telah memulai panggilan video pada ${forum?.title}. Anda telah diundang untuk bergabung dengan panggilan video baru pada forum ini. Ayo klik <a href="${ENV.publicUrl}/forum/${forumId}/video/${forum.video?.id}">disini</a> untuk bergabung</p>`
    })
  })
}

export const getVideoCallById = async (videoId: string) => {
  return await db.video.findUnique({
    where: { id: videoId },
    include: videoInclude
  })
}

export const removeVideoCallById = async (videoId: string, userId: string) => {
  return await db.video.delete({
    where: { id: videoId },
    include: videoInclude
  })
}

export const getEnabledVideoCallByForumId = async (forumId: string) => {
  return await db.video.findFirst({
    where: {
      forum_id: forumId,
      is_enabled: true
    },
    include: videoInclude
  })
}
