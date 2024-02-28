import { getMembersCountFn, getReportsCountFn } from '@/api/dashboard.api'
import { useQuery } from 'react-query'

export const useGetReportsCount = () => {
  return useQuery('reportsCount', getReportsCountFn)
}

export const useGetMembersCount = () => {
  return useQuery('membersCount', getMembersCountFn)
}
