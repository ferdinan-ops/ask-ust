import { MetaType } from './forum.type'

export type LectureType = {
  id: string
  name: string
}

export type LectureResponseType = {
  data: LectureType[]
  meta: MetaType
}

export type CourseLectureType = {
  id: string
  lecture_id: string
  course_id: string
  lecture: LectureType
  course: LectureType
}

export type CourseLectureResponseType = {
  data: CourseLectureType[]
  meta: MetaType
}
