import { type Request, type Response } from 'express'
import * as DashboardService from '../services/dashboard.service'
import { logInfo } from '../utils/logger'

export const getReportsCount = async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    const data = await DashboardService.getReportsCountByUserId(userId)

    logInfo(req, 'Getting user reports count')
    res.status(200).json({ message: 'Berhasil menampilkan data laporan user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMembersCount = async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    const data = await DashboardService.getAllMembersOnMyForumsCount(userId)

    logInfo(req, 'Getting user members count')
    res.status(200).json({ message: 'Berhasil menampilkan data member user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
