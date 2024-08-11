/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/indent */
import { v4 } from 'uuid'
import { ForumType, MemberRole } from '@prisma/client'
import OpenAI from 'openai'

import db from '../utils/db'

import { IForumTypeUpdatePayload, type IForum } from '../types/forum.type'
import { userSelect, userValidateSelect } from '../utils/service'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'
import { emailFormat } from '../utils/emailFormat'
import logger from '../utils/logger'
import axios from 'axios'

const openai = new OpenAI({
  apiKey: ENV.openAiUserApiKey as string
})

export const addNewForum = async (payload: IForum & { userId: string; type: ForumType }) => {
  const { userId, title, description, category, type, image } = payload

  return await db.forum.create({
    data: {
      user_id: userId,
      title: title as string,
      description,
      category,
      type,
      image: image ?? null,
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

interface IGetParams {
  page: number
  limit: number
  search: string
}

export const fetchForumsForAdmin = async ({ page, limit, search, filter }: IGetParams & { filter: ForumType }) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        ...(filter ? { type: filter } : {})
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: {
          include: {
            user: userSelect
          },
          orderBy: { created_at: 'asc' }
        },
        _count: {
          select: { messages: true, members: true, reports: true }
        },
        user: {
          select: {
            ...userSelect.select,
            validate: userValidateSelect
          }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        ...(filter ? { type: filter } : {})
      }
    })
  ])

  return { data, count }
}

export const getForumsFromDB = async ({ page, limit, search }: IGetParams) => {
  const [data, count] = await db.$transaction([
    db.forum.findMany({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        type: 'PUBLIC'
      },
      include: {
        members: {
          include: {
            user: userSelect
          },
          orderBy: { created_at: 'asc' }
        },
        _count: {
          select: { messages: true, members: true, reports: true }
        }
      },
      orderBy: { created_at: 'desc' }
    }),
    db.forum.count({
      where: {
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
        type: 'PUBLIC'
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
        include: {
          user: userSelect,
          reports: true
        },
        orderBy: { role: 'asc' }
      },
      _count: {
        select: { messages: true, members: true }
      },
      user: {
        select: {
          ...userSelect.select,
          validate: userValidateSelect
        }
      }
    }
  })
}

export const getForumByIdForUser = async (forumId: string) => {
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: {
      members: {
        include: {
          user: userSelect,
          reports: true
        },
        orderBy: { role: 'asc' }
      },
      _count: {
        select: { messages: true, members: true }
      }
    }
  })

  if (forum?.type === 'PENDING' || forum?.type === 'RESTRICTED') {
    return { id: forum.id, title: forum.title, category: forum.category, type: forum.type, note: forum.note }
  }

  return forum
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

export const updateForumById = async (forumId: string, userId: string, payload: IForum) => {
  return await db.forum.update({
    where: {
      id: forumId,
      user_id: userId
    },
    data: payload
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

export const getForumByInviteCode = async (inviteCode: string) => {
  return await db.forum.findFirst({
    where: { invite_code: inviteCode },
    include: {
      members: true
    }
  })
}

export const isMemberAlreadyJoin = async (forumId: string, userId: string) => {
  return await db.forum.findFirst({
    where: {
      id: forumId,
      members: {
        some: {
          user_id: userId
        }
      }
    }
  })
}

export const sendNotifForumToAdmin = async (forumId: string, userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  const forum = await db.forum.findUnique({ where: { id: forumId } })

  const admins = await db.user.findMany({
    where: {
      OR: [{ role: 'ADMIN' }, { role: 'SUPER_ADMIN' }]
    },
    select: { email: true }
  })

  admins.forEach((admin) => {
    sendMail({
      from: ENV.aplicationName,
      to: admin.email,
      subject: 'Validasi Forum Baru',
      html: emailFormat({
        btnText: 'Lihat ke aplikasi',
        btnLink: `${ENV.publicUrl}/admin/forum/${forumId}`,
        children: `
        <p>Halo Admin,</p>
        <p>Forum baru dengan judul <b>${forum?.title}</b> telah dibuat oleh ${user?.fullname} dengan kategori forum <b>${forum?.category}</b>. Silahkan validasi forum tersebut, segera cek aplikasi USTalk untuk melihat.</p>
        `
      })
    })
  })
}

export const changeForumTypeFromDB = async (forumId: string, payload: IForumTypeUpdatePayload) => {
  return await db.forum.update({
    where: { id: forumId },
    data: {
      type: payload.is_publish ? 'PUBLIC' : 'RESTRICTED',
      note: payload.note
    }
  })
}

export const sendValidateForumNotif = async (forumId: string) => {
  const forum = await db.forum.findUnique({ where: { id: forumId }, include: { user: true } })

  sendMail({
    from: ENV.aplicationName,
    to: forum?.user?.email,
    subject: `Forum ${forum?.title} ${forum?.type === 'PUBLIC' ? 'diiizinkan' : 'ditolak'}`,
    html: emailFormat({
      btnText: 'Lihat ke aplikasi',
      btnLink: `${ENV.publicUrl}/forum/${forumId}`,
      children: `
      <p>Halo ${forum?.user?.fullname},</p>
      <h1>${forum?.type === 'PUBLIC' ? `Selamat! Forum ${forum.title} diizinkan untuk publik.` : `Maaf, Forum ${forum?.title} tidak diizinkan untuk dipulikasikan`}</h1>
      <p>${forum?.note === '' ? 'Yey, setelah melihat forum kamu, kami memutuskan untuk mengizinkan forum kamu untuk dipublikasikan. Ayo mulai gunakan forum ini dengan berdiskusi dan berbincang-bincang dengan pengguna lainnya.' : 'forum.note'} </p>
      `
    })
  })
}

export const fetchSummaryFromGPT = async (forumId: string) => {
  try {
    const messages = await db.message.findMany({
      where: { forum_id: forumId },
      select: {
        content: true,
        member: {
          select: {
            user: {
              select: {
                fullname: true
              }
            }
          }
        }
      }
    })

    const prompt = `Berikut adalah beberapa komentar dari sebuah diskusi. Buatlah kesimpulan dari diskusi ini.\n\nKomentar:\n${messages
      .map((message) => `${message.member.user.fullname}: ${message.content}`)
      .join('\n')}`

    logger.info({ prompt })

    const completion = await openai.chat.completions.create({
      model: 'text-davinci-003',
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ]
    })

    logger.info({ completion, api: ENV.openAiUserApiKey })

    return completion.choices[0].message.content
  } catch (error) {
    logger.error(error)
  }
}

export const fetchSummaryFromGeminiAi = async (forumId: string) => {
  try {
    const messages = await db.message.findMany({
      where: { forum_id: forumId },
      select: {
        content: true,
        forum: {
          select: {
            title: true
          }
        }
      }
    })

    const messagesPlainText = messages.map((message) => message.content).join('\n')

    const prompt = `Berikut adalah beberapa komentar dari sebuah forum yang berjudul ${messages?.[0].forum.title}. Buatlah kesimpulan dari diskusi ini.\n\nKomentar:\n${messagesPlainText}`

    // const prompt = `Berikut adalah beberapa komentar dari sebuah diskusi. Buatlah kesimpulan dari diskusi ini.\n\nKomentar:\n${messages
    //   .map((message) => `${message.member.user.fullname}: ${message.content}`)
    //   .join('\n')}`

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${ENV.geminiApiKey}`
    const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] })

    return response.data?.candidates?.[0]?.content.parts[0].text
  } catch (error) {
    logger.error(error)
  }
}
