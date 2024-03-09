import { type Request, type Response } from 'express'

import { logError, logInfo } from '../utils/logger'
import * as MemberService from '../services/member.service'
import { validReportMember, validUpdateMember } from '../validations/member.validation'

import { type IReportMemberPayload, type IUpdateMemberPayload } from '../types/member.type'
import { MemberRole } from '@prisma/client'

export const getMembers = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const { forumId } = req.params

  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 30
  const search = (q as string) ?? ''

  try {
    const { data, count } = await MemberService.getMembersByForumId({
      forumId,
      search,
      page: currentPage,
      limit: perPage
    })

    logInfo(req, 'Getting members')
    res.status(200).json({
      message: 'Berhasil menampilkan seluruh member forum',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const kickMember = async (req: Request, res: Response) => {
  const { memberId, forumId } = req.params
  const userId = req.userId as string

  try {
    const forum = await MemberService.getMemberByUserIdAndForumId(userId, forumId)
    if (forum?.members?.[0]?.role !== MemberRole.ADMIN) {
      logError(req, 'User is not admin')
      return res.status(400).json({ error: 'User bukan admin' })
    }

    const data = await MemberService.removeMember(memberId, forumId, userId)
    logInfo(req, 'Kicking member')
    res.status(200).json({ message: 'Member berhasil dikeluarkan', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMember = async (req: Request, res: Response) => {
  const { memberId } = req.params
  const { value, error } = validUpdateMember(req.body as IUpdateMemberPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  const userId = req.userId as string
  const { forumId, role } = value

  try {
    const forum = await MemberService.getMemberByUserIdAndForumId(userId, forumId)
    if (forum?.members?.[0]?.role !== MemberRole.ADMIN) {
      logError(req, 'User is not admin')
      return res.status(400).json({ error: 'User bukan admin' })
    }

    const data = await MemberService.updateMemberRole({
      role,
      userId,
      forumId,
      memberId
    })

    await MemberService.sendRoleEmailToMember(memberId, forumId, role)

    logInfo(req, 'Updating member')
    res.status(200).json({ message: 'Member berhasil diupdate', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const reportMember = async (req: Request, res: Response) => {
  const { value, error } = validReportMember(req.body as IReportMemberPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await MemberService.addReport(value)
    await MemberService.sendReportEmailToAdmin(value.forum_id, value.member_id)

    logInfo(req, 'Reporting member')
    res.status(200).json({ message: 'Member berhasil dilaporkan', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMember = async (req: Request, res: Response) => {
  const { memberId } = req.params

  try {
    const data = await MemberService.getMemberById(memberId)

    logInfo(req, 'Getting member')
    res.status(200).json({ message: 'Berhasil menampilkan member', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMemberLogin = async (req: Request, res: Response) => {
  const { forumId } = req.params
  const userId = req.userId as string

  try {
    const data = await MemberService.getMemberByUserIdAndForumId(userId, forumId)

    logInfo(req, 'Getting member login')
    res.status(200).json({ message: 'Berhasil menampilkan member login', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
