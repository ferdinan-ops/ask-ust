import { type Request, type Response } from 'express'
import * as ReportService from '../services/report.service'
import { logInfo } from '../utils/logger'

export const getReports = async (req: Request, res: Response) => {
  const { memberId, forumId } = req.params

  try {
    const reports = await ReportService.getReportsFromDB(memberId, forumId)
    logInfo(req, 'Get reports by member id success')
    res.status(200).json({ message: 'Berhasil mendapatkan laporan', data: reports })
  } catch (error) {
    res.status(500).json({ error })
  }
}
