/* eslint-disable @typescript-eslint/indent */
import { userSelect } from '../utils/service'
import { type IUpdateMemberParams, type IMembersParams, type IReportMemberPayload } from '../types/member.type'

import db from '../utils/db'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'

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
      include: { user: userSelect, reports: true },
      orderBy: { created_at: 'asc' }
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

export const getMemberById = async (memberId: string) => {
  return await db.member.findUnique({
    where: { id: memberId },
    include: { user: userSelect }
  })
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

export const sendReportEmailToAdmin = async (forumId: string, memberId: string) => {
  const admin = await db.forum.findUnique({
    where: { id: forumId },
    include: { members: { where: { role: 'ADMIN' }, select: { user: userSelect } } }
  })

  const member = await db.member.findUnique({
    where: { id: memberId },
    include: { user: userSelect }
  })

  const adminEmail = admin?.members?.[0]?.user?.email

  if (adminEmail) {
    sendMail({
      from: ENV.emailUsername,
      to: adminEmail,
      subject: 'Laporan Anggota',
      html: `<h3>Ada Anggota yang dilaporkan!!</h3><p>Hai pemilik forum <b>${admin.title}</b>, anggota dengan username <b>${member?.user?.username}</b> telah dilaporkan oleh salah satu anggota yang bergabung. Ayo segera masuk dan cek ke dalam aplikasi untuk dapat menangani anggota yang bermasalah.</p><p>Silahkan tekan atau akses link berikut ini untuk dapat segera melihat track dari anggota ini:</p><a href="${ENV.publicUrl}/forums/${forumId}/member/${memberId}">Lihat Anggota</a>`
    })
  }
}

export const sendRoleEmailToMember = async (memberId: string, forumId: string, role: string) => {
  const member = await db.member.findUnique({
    where: { id: memberId },
    include: { user: userSelect }
  })

  const forum = await db.forum.findUnique({
    where: { id: forumId }
  })

  const memberEmail = member?.user?.email

  if (memberEmail) {
    sendMail({
      from: ENV.emailUsername,
      to: memberEmail,
      subject: 'Perubahan Role',
      html: `<h3>Selamat ${role} baru!!</h3><p>Selamat Role anda anda di forum <b>${forum?.title}</b> telah diubah menjadi:</p><h1>${role}</h1>`
    })
  }
}
