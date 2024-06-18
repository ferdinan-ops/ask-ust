/* eslint-disable @typescript-eslint/return-await */
import db from '../utils/db'
import { IValidateUpdatePayload, IValidateUser } from '../types/validate.type'
import { userSelect, userValidateSelect } from '../utils/service'

export const addNewValidate = async (payload: IValidateUser) => {
  return await db.validate.create({ data: payload })
}

export const changeValidateStatus = async (validateId: string, payload: IValidateUpdatePayload) => {
  return await db.validate.update({
    where: { id: validateId },
    data: {
      user_id: payload.userId,
      is_valid: payload.isValid,
      note: payload.note
    }
  })
}

export const fetchValidates = async () => {
  return await db.validate.findMany({
    include: {
      user: {
        select: userSelect.select
      }
    }
  })
}

export const fetchValidateByUserId = async (userId: string) => {
  return await db.validate.findFirst({
    where: { user_id: userId },
    select: {
      ...userValidateSelect.select,
      user: {
        select: userSelect.select
      }
    }
  })
}

export const changeValidateReadStatus = async (validateId: string) => {
  return await db.validate.update({
    where: { id: validateId },
    data: { is_read: true }
  })
}
