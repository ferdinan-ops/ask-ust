/* eslint-disable @typescript-eslint/return-await */
import db from '../utils/db'
import { IValidateUpdatePayload, IValidateUser } from '../types/validate.type'
import { userSelect, userValidateSelect } from '../utils/service'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'
import { emailFormat } from '../utils/emailFormat'

export const addNewValidate = async (payload: IValidateUser) => {
  return await db.validate.create({
    data: payload,
    include: {
      user: { select: userSelect.select }
    }
  })
}

export const changeValidateStatus = async (validateId: string, payload: IValidateUpdatePayload) => {
  return await db.validate.update({
    where: { id: validateId },
    data: {
      is_valid: payload.isValid,
      note: payload.note ?? ''
    },
    include: { user: userSelect }
  })
}

export const fetchValidates = async (page: number, limit: number, search: string, filter?: string) => {
  const [data, count] = await db.$transaction([
    db.validate.findMany({
      where: {
        user: {
          OR: [
            { fullname: { contains: search } },
            { username: { contains: search } },
            { email: { contains: search } },
            { banned_type: 'VIOLATION' },
            { banned_type: null }
          ],
          role: 'USER',
          answers: { some: {} }
        },

        /**
         * filter = valid, when is_valid = true
         * filter = invalid, when is_valid = false and note is not null
         * filter = pending, when is_valid = false and note is null
         */
        ...(filter === 'valid' && { is_valid: true }),
        ...(filter === 'invalid' && { is_valid: false, note: { not: null } }),
        ...(filter === 'pending' && { is_valid: false, note: null })
      },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: userSelect },
      orderBy: { created_at: 'desc' }
    }),
    db.validate.count({
      where: {
        user: {
          OR: [{ fullname: { contains: search } }, { username: { contains: search } }, { email: { contains: search } }],
          role: 'USER'
        },
        ...(filter === 'valid' && { is_valid: true }),
        ...(filter === 'invalid' && { is_valid: false, note: { not: null } }),
        ...(filter === 'pending' && { is_valid: false, note: null })
      }
    })
  ])

  return { data, count }
}

export const fetchValidateByUserId = async (userId: string, isUser?: boolean) => {
  const userQuizzes = await db.answer.findMany({
    where: {
      user_id: userId
    }
  })

  if (isUser) {
    const validate = await db.validate.findUnique({
      where: { user_id: userId },
      select: {
        user: {
          select: {
            ...userSelect.select,
            is_banned: true,
            banned_type: true
          }
        },
        ...userValidateSelect.select
      }
    })

    return {
      quiz: { isFinished: userQuizzes.length > 0 },
      validate
    }
  }

  const validate = await db.validate.findUnique({
    where: { user_id: userId },
    include: { user: userSelect }
  })

  const userQuizzesCorrect = userQuizzes.filter((quiz) => quiz.is_correct)

  return {
    quiz: {
      total: userQuizzesCorrect.length,
      isFinished: userQuizzes.length > 0
    },
    validate
  }
}

export const changeValidateReadStatus = async (validateId: string) => {
  return await db.validate.update({
    where: { id: validateId },
    data: { is_read: true }
  })
}

export const fetchUnreadValidatesCount = async () => {
  return await db.validate.count({ where: { is_read: false } })
}

export const removeValidateUser = async (validateId: string) => {
  return await db.validate.delete({
    where: { id: validateId },
    select: {
      ...userValidateSelect.select,
      user: {
        select: userSelect.select
      }
    }
  })
}

export const sendNotificationToAdmin = async (userId: string, fullname: string) => {
  const users = await db.user.findMany({
    where: {
      OR: [{ role: 'SUPER_ADMIN' }, { role: 'ADMIN' }]
    },
    select: { email: true }
  })

  users.forEach((user) => {
    sendMail({
      from: ENV.aplicationName,
      to: user?.email,
      subject: 'Verifikasi Data',
      html: emailFormat({
        btnText: 'Lihat ke aplikasi',
        btnLink: `${ENV.publicUrl}/admin/validate/${userId}`,
        children: `
        <p>Halo Admin,</p>
        <p>
          Terdapat data pengguna baru dengan nama <b>${fullname}</b> yang perlu diverifikasi oleh kamu, ayo segera cek aplikasi USTalk untuk melihat data tersebut.
        </p>
    `
      })
    })
  })
}

export const sendValidateNotification = async (email: string, isValid: boolean, note?: string) => {
  sendMail({
    from: ENV.aplicationName,
    to: email,
    subject: 'Verifikasi Data',
    html: emailFormat({
      btnText: 'Lihat ke aplikasi',
      btnLink: `${ENV.publicUrl}/unverified`,
      children: `
        <p>Verifikasi data anda telah selesai</p>
        <h1>${isValid ? 'Selamat!, data kamu terbukti valid' : 'Maaf, data kamu tidak valid'}</h1>
        <p>${note !== '' ? note : 'Yey, setelah kami periksa keseluruhan data kamu, kamu telah terbukti sebagai salah satu bagian dari civitas akademik Universitas Katolik Santo Thomas Medan. Ayo mulai gunakan dan jelajahi aplikasi <b>USTalk</b> ini dengan berdiskusi dan berbincang-bincang dengan pengguna lainnya.'}</p>
    `
    })
  })
}

export const uploadQuizRecord = async (userId: string, url: string) => {
  return await db.validate.update({
    where: { user_id: userId },
    data: {
      url_quiz_record: url
    }
  })
}
