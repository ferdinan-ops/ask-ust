import api from './axiosInstance'
import { ForumType } from '@/lib/validations/forum.validation'

export const addForumFn = async (data: ForumType) => {
  return await api.post('/forums', data)
}
