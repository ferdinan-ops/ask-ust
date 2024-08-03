/* eslint-disable @typescript-eslint/return-await */
import db from '../utils/db'
import ENV from '../utils/environment'
import sendMail from '../middlewares/mailer'
import { userSelect } from '../utils/service'
import { emailFormat } from '../utils/emailFormat'

const mediaInclude = {
  member: {
    include: {
      user: userSelect
    }
  }
}

export const enabledMediaCall = async (forumId: string, userId: string, type: string) => {
  const member = await db.member.findFirst({
    where: {
      forum_id: forumId,
      user_id: userId
    }
  })

  const forum = await db.forum.update({
    where: { id: forumId },
    data: {
      media: {
        create: {
          type,
          is_enabled: true,
          member_id: member?.id as string
        }
      }
    },
    include: {
      media: {
        include: mediaInclude
      }
    }
  })

  return forum.media
}

export const sendMediaCallInvite = async (forumId: string, type: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      media: {
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
      from: ENV.aplicationName,
      to: member.user.email,
      subject: `Panggilan Grup ${type === 'video' ? 'Video' : 'Suara'} Telah Dimulai`,
      html: emailFormat({
        btnText: 'Ayo bergabung',
        btnLink: `${ENV.publicUrl}/forums/${forumId}/${type}/${forum.media?.id}`,
        children: `
        <p>
          Hai ${member.user.fullname}, </p><p>Salah satu anggota pada forum <b>${forum.title}</b> yaitu <b>${forum?.media?.member.user.fullname}</b> telah memulai panggilan ${type}. Anda telah diundang untuk dapat bergabung dalam panggilan ${type} baru yang telah dibuat tersebut pada forum ini dan menjadi bagian dari diskusi yang lebih seru.
        </p>
        <p>
          Ayo bergabung dan jangan sampai ketinggalan! Klik tombol di bawah ini untuk bergabung dalam panggilan ${type} tersebut.
        </p>
        `
      })
    })
  })
}

export const getMediaCallById = async (mediaId: string) => {
  return await db.media.findUnique({
    where: { id: mediaId },
    include: mediaInclude
  })
}

export const removeMediaCallById = async (mediaId: string, userId: string) => {
  return await db.media.delete({
    where: { id: mediaId },
    include: mediaInclude
  })
}

export const getEnabledMediaCallByForumId = async (forumId: string) => {
  return await db.media.findFirst({
    where: {
      forum_id: forumId,
      is_enabled: true
    },
    include: mediaInclude
  })
}
