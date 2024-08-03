/* eslint-disable @typescript-eslint/return-await */
import db from '../utils/db'
import ENV from '../utils/environment'

import * as UserService from './user.service'

export const bannedMessage = 'Anda dibanned selama 1 hari'
export const toxicMessage = 'Pesan ini tidak diperbolehkan'
export const toxicImage = 'Gambar ini tidak diperbolehkan'

export const fetchRecentViolationByUser = async (userId: string) => {
  return await db.violation.findFirst({
    where: {
      user_id: userId,
      last_violation: {
        gte: ENV.violationTimeLimit
      }
    }
  })
}

export const fetchViolationByUser = async (userId: string) => {
  return await db.violation.findFirst({
    where: {
      user_id: userId
    }
  })
}

export const createViolation = async (userId: string) => {
  return await db.violation.create({
    data: {
      user_id: userId,
      violation_count: 1
    }
  })
}

export const incrementViolationCount = async (userId: string) => {
  return await db.violation.update({
    where: {
      user_id: userId
    },
    data: {
      violation_count: { increment: 1 }
    }
  })
}

export const deleteViolation = async (violationId: string) => {
  return await db.violation.delete({
    where: {
      id: violationId
    }
  })
}

export const validateUser = async (userId: string) => {
  const user = await UserService.getUserLogin(userId)
  const banTime = new Date(user?.banned_until ?? 0)

  return user?.is_banned && banTime > new Date()
}

export const handleViolations = async (userId: string, type: 'image' | 'message') => {
  const errToxicMessage = type === 'image' ? toxicImage : toxicMessage

  try {
    const violation = await fetchViolationByUser(userId)
    if (violation) {
      const isReset = violation.last_violation < ENV.violationTimeLimit && violation.violation_count < 5
      if (isReset) await deleteViolation(violation.id)
    }

    const recentViolation = await fetchRecentViolationByUser(userId)

    if (recentViolation) {
      if (recentViolation.violation_count >= 5) {
        await UserService.changeBannedStatus(userId)
        return { error: bannedMessage, success: false }
      }

      await incrementViolationCount(userId)
      return { error: errToxicMessage, success: false }
    }

    const pastViolation = await fetchViolationByUser(userId)

    if (pastViolation && pastViolation.violation_count >= 5) {
      await UserService.changeBannedStatus(userId)
      await incrementViolationCount(userId)
      return { error: bannedMessage, success: false }
    }

    if (!recentViolation && !pastViolation) {
      await createViolation(userId)
    } else {
      await incrementViolationCount(userId)
    }

    return { error: errToxicMessage, success: false }
  } catch (error) {
    return { error, success: false }
  }
}
