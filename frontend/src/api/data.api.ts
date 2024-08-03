import { CourseLectureResponseType, LectureResponseType } from '@/lib/types/data.type'
import api from './axiosInstance'

export interface GetParams {
  page?: number
  search?: string
}

export const getLecturersFn = async (params: GetParams): Promise<LectureResponseType> => {
  const response = await api.get('/lecture', {
    params: {
      page: params.page,
      q: params.search
    }
  })

  return response.data
}

export const getCoursesFn = async (params: GetParams): Promise<LectureResponseType> => {
  const response = await api.get('/course', {
    params: {
      page: params.page,
      q: params.search
    }
  })

  return response.data
}

export const getCourseAndLecturersFn = async (params: GetParams): Promise<CourseLectureResponseType> => {
  const response = await api.get('/course-lecture', {
    params: {
      page: params.page,
      q: params.search
    }
  })

  return response.data
}

export const importLectureFn = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return await api.post('/lecture/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const importCourseFn = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return await api.post('/course/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const importCourseAndLecturersFn = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return await api.post('/course-lecture/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
