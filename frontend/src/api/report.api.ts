import { ReportType } from '@/lib/types/report.type'
import api from './axiosInstance'

export const getReportsFn = async (memberId: string, forumId: string): Promise<ReportType[]> => {
  const response = await api.get(`/reports/${memberId}/forum/${forumId}`)
  return response.data?.data
}
