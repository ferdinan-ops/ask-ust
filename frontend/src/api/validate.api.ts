import api from './axiosInstance'
import { useUserInfo } from '@/store/client'
import { UserType, ValidateResponseType } from '@/lib/types/user.type'

type StorePayload = {
  file: File[]
  photo: File[]
  agreement: boolean
}

export const storeValidateUserFn = async (payload: StorePayload): Promise<UserType> => {
  const formData = new FormData()
  formData.append('file', payload.file[0])
  formData.append('photo', payload.photo[0])
  formData.append('userId', useUserInfo.getState().user?.id.toString())

  if (payload.agreement) {
    formData.append('agreement', payload.agreement.toString())
  }

  const response = await api.post('/validate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data?.data
}

export const getUserValidatesFn = async (
  search?: string,
  page?: number,
  filter?: string
): Promise<ValidateResponseType> => {
  const response = await api.get('/validate', {
    params: {
      q: search,
      page,
      limit: 10,
      filter
    }
  })

  return response.data
}

export const getUserValidateByIdFn = async (userId: string): Promise<UserType> => {
  const response = await api.get(`/validate/user/${userId}`)
  return response.data?.data
}

type UpdateValidatePayload = {
  isValid: boolean
  note?: string
  validateId: string
}

export const updateValidateUserFn = async (payload: UpdateValidatePayload) => {
  const { validateId, ...rest } = payload
  return await api.put(`/validate/${validateId}`, rest)
}

export const getUnreadValidatesFn = async (): Promise<number> => {
  const response = await api.get('/validate/notif')
  return response.data?.data
}

export const updateReadStatusFn = async (validateId: string) => {
  return await api.put(`/validate/${validateId}/read`)
}

export const deleteValidateUserFn = async (validateId: string): Promise<UserType> => {
  const response = await api.delete(`/validate/${validateId}`)
  return response.data?.data
}
