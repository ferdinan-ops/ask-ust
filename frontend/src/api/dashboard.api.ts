import { ReportType } from '@/lib/types/report.type'
import api from './axiosInstance'

export const getReportsCountFn = async (): Promise<number> => {
  const response = await api.get('/dashboard/reports/count')
  return response.data?.data
}

export const getMembersCountFn = async (): Promise<number> => {
  const response = await api.get('/dashboard/members/count')
  return response.data?.data
}

export const getReportsCountByForumFn = async (forumId: string): Promise<ReportType[]> => {
  const response = await api.get(`/dashboard/reports/count/${forumId}`)
  return response.data?.data
}
