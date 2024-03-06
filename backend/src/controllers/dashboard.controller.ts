import { type Request, type Response } from 'express'
import * as DashboardService from '../services/dashboard.service'
import * as UserService from '../services/user.service'
import { logInfo } from '../utils/logger'

export const getDashboardCounts = async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    const reportCount = await DashboardService.getReportsCountByUserId(userId)
    const membersCount = await DashboardService.getAllMembersOnMyForumsCount(userId)
    const loginForumCount = await UserService.getUserLoginForumsCount(req.userId as string)
    const joinedForumCount = await UserService.getUserJoinForumsCount(req.userId as string)
    const results = {
      joined_forum: joinedForumCount,
      my_forum: loginForumCount,
      report: reportCount,
      member: membersCount
    }

    logInfo(req, 'Getting user dashboard counts')
    res.status(200).json({ message: 'Berhasil menampilkan data dashboard user', data: { _count: results } })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getReportsByForum = async (req: Request, res: Response) => {
  const userId = req.userId as string
  const forumId = req.params.forumId

  try {
    const data = await DashboardService.getReportsByForumId(forumId, userId)

    logInfo(req, 'Getting user reports count by forum')
    res.status(200).json({ message: 'Berhasil menampilkan data laporan user berdasarkan forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getForumsUser = async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    const data = await DashboardService.getForumsByUserId(userId)

    logInfo(req, 'Getting user forum')
    res.status(200).json({ message: 'Berhasil menampilkan data forum user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
