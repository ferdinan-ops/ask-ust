import { UserType } from '@/lib/types/user.type'
import api from './axiosInstance'
import { ForumResponseType } from '@/lib/types/forum.type'
import { ChangePasswordType, EditUserType } from '@/lib/validations/user.validation'

export const getMeFn = async (): Promise<UserType> => {
  const response = await api.get('/users')
  return response.data?.data
}

export const getJoinedForumsFn = async (page: number): Promise<ForumResponseType> => {
  const response = await api.get('/users/forums/joined', { params: { page } })
  return response.data
}

export const getMyForumFn = async (page: number): Promise<ForumResponseType> => {
  const response = await api.get('/users/forums', { params: { page } })
  return response.data
}

export const updateMeFn = async (data: EditUserType): Promise<UserType> => {
  const response = await api.put('/users', data)
  return response.data?.data
}

export const changePasswordFn = async (data: ChangePasswordType) => {
  if (data.confirmPassword) {
    return await api.put('/users/change-password', data)
  }
}
