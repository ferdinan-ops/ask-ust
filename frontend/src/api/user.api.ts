import { UserType } from '@/lib/types/user.type'
import api from './axiosInstance'

export const getMeFn = async (): Promise<UserType> => {
  const response = await api.get('/users')
  return response.data?.data
}
