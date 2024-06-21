/* eslint-disable @typescript-eslint/return-await */
import db from '../utils/db'
import { IValidateUpdatePayload, IValidateUser } from '../types/validate.type'
import { userSelect, userValidateSelect } from '../utils/service'
import sendMail from '../middlewares/mailer'
import ENV from '../utils/environment'

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
          OR: [{ fullname: { contains: search } }, { username: { contains: search } }, { email: { contains: search } }],
          is_admin: false
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
          is_admin: false
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
  if (isUser) {
    return await db.validate.findUnique({
      where: { user_id: userId },
      select: {
        user: userSelect,
        ...userValidateSelect.select
      }
    })
  }

  return await db.validate.findUnique({
    where: { user_id: userId },
    include: { user: userSelect }
  })
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
  const user = await db.user.findFirst({
    where: { is_admin: true },
    select: { email: true }
  })

  sendMail({
    from: ENV.emailUsername,
    to: user?.email as string,
    subject: 'Verifikasi Data',
    html: `
    <p>Halo Admin,</p>
    <p>Ada data pengguna baru dengan nama <b>${fullname}</b> yang perlu diverifikasi oleh kamu, ayo segera cek aplikasi <b>ask.ust</b> untuk melihat data tersebut.</p>
    <br/>
    <br/>
    <a href="${ENV.publicUrl}/admin/validate/${userId}" style="background-color: #18181b; outline: none; border-radius: 6px; padding: 10px 16px;color: #fff; border: 0; cursor: pointer; text-decoration: none">
    Lihat ke aplikasi
    </a>
    <br/>
    `
  })
}

export const sendValidateNotification = async (email: string, isValid: boolean, note?: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Verifikasi Data',
    html: `
    <p>Verifikasi data anda telah selesai</p>
    <h1>${isValid ? 'Selamat!!!, data kamu terbukti valid' : 'Maaf, data kamu tidak valid'}</h1>
    <p>${note !== '' ? note : 'Yey, setelah kami periksa keseluruhan data kamu, kamu telah terbukti sebagai salah satu bagian dari civitas akademik Universitas Katolik Santo Thomas Medan. Ayo mulai gunakan dan jelajahi aplikasi <b>ask.ust</b> ini dengan berdiskusi dan berbincang-bincang dengan pengguna lainnya.'}</p>
    <br/>
    <br/>
    <a href="${ENV.publicUrl}/unverified" style="background-color: #18181b; outline: none; border-radius: 6px; padding: 10px 16px;color: #fff; border: 0; cursor: pointer; text-decoration: none">
    Lihat ke aplikasi
    </a>
    <br/>
    `
  })
}
