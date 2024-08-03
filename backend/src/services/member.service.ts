/* eslint-disable @typescript-eslint/indent */
import { userSelect } from '../utils/service'
import { type IUpdateMemberParams, type IMembersParams, type IReportMemberPayload } from '../types/member.type'

import db from '../utils/db'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'
import { emailFormat } from '../utils/emailFormat'

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
      from: ENV.aplicationName,
      to: adminEmail,
      subject: 'Laporan Anggota',
      html: emailFormat({
        btnText: 'Lihat Anggota',
        btnLink: `${ENV.publicUrl}/forums/${forumId}/member/${memberId}`,
        children: `
          <h3>Ada Anggota yang dilaporkan!!</h3>
          <p>
            Hai pemilik forum <b>${admin.title}</b>, anggota dengan username <b>${member?.user?.username}</b> telah dilaporkan oleh salah satu anggota yang bergabung. Ayo segera masuk dan cek ke dalam aplikasi untuk dapat menangani anggota yang bermasalah.
          </p>
          <p>
            Silahkan tekan tombol berikut ini untuk dapat dengan segera melihat track dari anggota yang dilaporkan.
          </p>
        `
      })
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
      from: ENV.aplicationName,
      to: memberEmail,
      subject: 'Perubahan Role',
      html: emailFormat({
        children: `
        ${member.role === 'MODERATOR' ? '<h3>Selamat!!</h3>' : ''}
        <p>Hai ${member?.user?.fullname},</p>
        <p>
          ${member.role === 'MODERATOR' ? 'Kami ucapkan selamat kepada kamu. ' : ''}Role kamu di forum <b>${forum?.title}</b> telah diubah oleh pemilik forum menjadi:
        </p>
        <br/>
        <h2 style="margin:0 auto; padding: 13px 16px; background-color: #ddd; border-radius: 6px; width: fit-content;">${role}</h2>
        <br/>
        <p>
          ${member.role === 'MODERATOR' ? 'Dengan perubahan role ini, kami harap kamu dapat lebih aktif dan dapat membantu pemilik forum dalam menjaga forum agar tetap kondusif dan nyaman bagi semua anggota yang bergabung.' : 'Jika kamu memiliki pertanyaan lebih lanjut, silahkan hubungi pemilik forum ini.'}
        </p>
        <p>
          Terima kasih atas partisipasi dan kontribusi yang telah kamu berikan dalam forum ini.
        </p>

      `
      })
    })
  }
}
