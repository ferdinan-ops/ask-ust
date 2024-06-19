import { FormFields } from '@/pages/auth/ValidateUser'
import api from './axiosInstance'
import { useUserInfo } from '@/store/client'
import { UserResponseType, UserType } from '@/lib/types/user.type'

export const storeValidateUserFn = async (payload: FormFields): Promise<UserType> => {
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

export const getUserValidatesFn = async (search?: string, page?: number, limit?: number): Promise<UserResponseType> => {
  const response = await api.get('/validate', {
    params: {
      q: search,
      page,
      limit
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
  userId: string
  validateId: string
}

export const updateValidateUserFn = async (payload: UpdateValidatePayload) => {
  const { validateId, ...rest } = payload
  return await api.put(`/validate/${validateId}`, rest)
}
