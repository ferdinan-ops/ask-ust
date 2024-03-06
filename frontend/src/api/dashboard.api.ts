import { ReportType } from '@/lib/types/report.type'
import api from './axiosInstance'
import { DashboardCountsType } from '@/lib/types/dashboard.type'

export const getReportsByForumFn = async (forumId: string): Promise<ReportType[]> => {
  const response = await api.get(`/dashboard/forums/${forumId}/reports`)
  return response.data?.data
}

export const getDashboardCountsFn = async (): Promise<DashboardCountsType> => {
  const response = await api.get('/dashboard/count')
  return response.data?.data
}

export const getForumsUserFn = async (): Promise<{ title: string; id: string }[]> => {
  const response = await api.get('/dashboard/forums')
  return response.data?.data
}
