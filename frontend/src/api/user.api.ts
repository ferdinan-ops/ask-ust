import { AdminResponseType, UserForumCountType, UserType } from '@/lib/types/user.type'
import { RegisterType } from '@/lib/validations/auth.validation'
import { MetaParamsType } from '@/lib/types/pagination.type'
import { ForumResponseType } from '@/lib/types/forum.type'
import api from './axiosInstance'

import {
  ChangePasswordType,
  ChangeProfilePicType,
  EditAdminType,
  EditUserType
} from '@/lib/validations/user.validation'

export const getMeFn = async (): Promise<UserType> => {
  const response = await api.get('/user')
  return response.data?.data
}

export const getJoinedForumsFn = async (page: number): Promise<ForumResponseType> => {
  const response = await api.get('/user/forums/joined', { params: { page } })
  return response.data
}

export const getMyForumFn = async (page: number): Promise<ForumResponseType> => {
  const response = await api.get('/user/forums', { params: { page } })
  return response.data
}

export const updateMeFn = async (data: EditUserType): Promise<UserType> => {
  const response = await api.put('/user', data)
  return response.data?.data
}

export const changePasswordFn = async (data: ChangePasswordType) => {
  if (data.confirmPassword) {
    return await api.put('/user/change-password', data)
  }
}

export const updateEmailFn = async (email: string) => {
  return await api.put('/user/change-email', { email })
}

export const uploadProfilePicFn = async (data: ChangeProfilePicType): Promise<UserType> => {
  const formData = new FormData()
  if (Array.isArray(data.photo) && data.photo.length > 0) {
    formData.append('photo', data.photo[0])
  }

  const response = await api.put('/user/change-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data?.data
}

export const getProfileForumsCountFn = async (): Promise<UserForumCountType> => {
  const response = await api.get('/user/forums/count')
  return response.data?.data
}

export const bannedUserFromAppFn = async (userId: string) => {
  return await api.post(`/user/banned/${userId}`)
}

export const createAdminFn = async (payload: RegisterType) => {
  const { confirmPassword, ...rest } = payload
  if (confirmPassword) {
    return await api.post('/user/admin', rest)
  }
}

export const deleteAdminFn = async (userId: string) => {
  return await api.delete(`/user/admin/${userId}`)
}

export const getAllAdminFn = async ({ search, page }: MetaParamsType): Promise<AdminResponseType> => {
  const response = await api.get('/user/admin', { params: { q: search, page } })
  return response.data
}

export const getAdminFn = async (userId: string): Promise<UserType> => {
  const response = await api.get(`/user/admin/${userId}`)
  return response.data?.data
}

type UpdateAdminParams = {
  userId: string
  payload: EditAdminType
}

export const updateAdminFn = async ({ userId, payload }: UpdateAdminParams): Promise<UserType> => {
  return await api.put(`/user/admin/${userId}`, payload)
}
