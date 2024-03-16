import sendMail from '../middlewares/mailer'
import db from '../utils/db'
import ENV from '../utils/environment'
import { userSelect } from '../utils/service'

const voiceInclude = {
  member: {
    include: {
      user: userSelect
    }
  }
}

export const enabledVoiceCall = async (forumId: string, userId: string) => {
  const member = await db.member.findFirst({
    where: {
      forum_id: forumId,
      user_id: userId
    }
  })

  const forum = await db.forum.update({
    where: { id: forumId },
    data: {
      voice: {
        create: {
          is_enabled: true,
          member_id: member?.id as string
        }
      }
    },
    include: {
      voice: {
        include: voiceInclude
      }
    }
  })

  return forum.voice
}

export const sendVoiceCallInvite = async (forumId: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      voice: {
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
      subject: 'Panggilan Grup Suara telah dimulai',
      html: `<p>Hai ${member.user.fullname}, </p><p>${forum?.voice?.member.user.fullname} telah memulai panggilan suara pada ${forum?.title}. Anda telah diundang untuk bergabung dengan panggilan suara baru pada forum ini. Ayo klik <a href="${ENV.publicUrl}/forum/${forumId}/voice/${forum.voice?.id}">disini</a> untuk bergabung</p>`
    })
  })
}

export const getVoiceCallById = async (voiceId: string) => {
  return await db.voice.findUnique({
    where: { id: voiceId },
    include: {
      member: {
        include: {
          user: userSelect
        }
      }
    }
  })
}

export const removeVoiceCallById = async (voiceId: string, userId: string) => {
  return await db.voice.delete({
    where: {
      id: voiceId
    },
    include: voiceInclude
  })
}

export const getEnabledVoiceCallByForumId = async (forumId: string) => {
  return await db.voice.findFirst({
    where: {
      forum_id: forumId,
      is_enabled: true
    },
    include: {
      member: {
        include: {
          user: userSelect
        }
      }
    }
  })
}
