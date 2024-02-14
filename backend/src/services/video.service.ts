import db from '../utils/db'
import ENV from '../utils/environment'
import sendMail from '../middlewares/mailer'
import { userSelect } from '../utils/service'

export const enabledVideoCall = async (forumId: string, memberId: string) => {
  const member = await db.member.findFirst({
    where: {
      forum_id: forumId,
      user_id: memberId
    }
  })

  return await db.forum.update({
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
      video: true
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
      html: `<p>Hai ${member.user.fullname}, </p><p>${forum?.video?.member.user.fullname} telah memulai panggilan video pada ${forum?.title}. Anda telah diundang untuk bergabung dengan panggilan video baru pada forum ini. Ayo klik <a href="${ENV.publicUrl}/forum/${forumId}/video">disini</a> untuk bergabung</p>`
    })
  })
}

export const getVideoCallById = async (videoId: string) => {
  return await db.video.findUnique({
    where: { id: videoId },
    include: {
      member: {
        include: {
          user: userSelect
        }
      }
    }
  })
}
