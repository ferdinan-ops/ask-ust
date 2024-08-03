import {
  getCourseAndLecturersFn,
  getCoursesFn,
  getLecturersFn,
  GetParams,
  importCourseAndLecturersFn,
  importCourseFn,
  importLectureFn
} from '@/api/data.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetLecturers = (params: GetParams) => {
  return useQuery(['lecturers', params.page, params.search], async () => getLecturersFn(params))
}

export const useGetCourses = (params: GetParams) => {
  return useQuery(['courses', params.page, params.search], async () => getCoursesFn(params))
}

export const useGetCourseAndLecturers = (params: GetParams) => {
  return useQuery(['course-lecturers', params.page, params.search], async () => getCourseAndLecturersFn(params))
}

export const useImportLecture = () => {
  const queryClient = useQueryClient()
  return useMutation(importLectureFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('lecturers')
      toast({
        title: 'Data berhasil diimpor',
        description: 'Data dosen yang kamu unggah berhasil diimpor ke dalam sistem.'
      })
    }
  })
}

export const useImportCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(importCourseFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      toast({
        title: 'Data berhasil diimpor',
        description: 'Data mata kuliah yang kamu unggah berhasil diimpor ke dalam sistem.'
      })
    }
  })
}

export const useImportCourseAndLecturers = () => {
  const queryClient = useQueryClient()
  return useMutation(importCourseAndLecturersFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('course-lecturers')
      toast({
        title: 'Data berhasil diimpor',
        description: 'Data relasi dosen dengan mata kuliah yang kamu unggah berhasil diimpor ke dalam sistem.'
      })
    }
  })
}
