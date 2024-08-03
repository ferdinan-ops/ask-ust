/* eslint-disable @typescript-eslint/member-delimiter-style */
import { ICourseLecture } from '../types/lecture.type'
import db from '../utils/db'
import XLSX from 'xlsx'

export const fetchLecturers = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.lecture.findMany({
      where: {
        OR: [{ name: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: 'asc' }
    }),
    db.lecture.count({
      where: {
        OR: [{ name: { contains: search } }]
      }
    })
  ])

  return { data, count }
}

export const fetchCourses = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.course.findMany({
      where: {
        OR: [{ name: { contains: search } }]
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'asc' }
    }),
    db.course.count({
      where: {
        OR: [{ name: { contains: search } }]
      }
    })
  ])

  return { data, count }
}

export const fetchCourseAndLecturers = async (page: number, limit: number, search: string) => {
  const [data, count] = await db.$transaction([
    db.courseLecture.findMany({
      where: {
        lecture: {
          OR: [{ name: { contains: search } }]
        },
        course: {
          OR: [{ name: { contains: search } }]
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        lecture: true,
        course: true
      }
    }),
    db.courseLecture.count({
      where: {
        lecture: {
          OR: [{ name: { contains: search } }]
        },
        course: {
          OR: [{ name: { contains: search } }]
        }
      }
    })
  ])

  return { data, count }
}

export const addManyLecturers = async (lecturers: Array<{ id: string; name: string }>) => {
  return await db.lecture.createMany({
    data: lecturers
  })
}

export const addManyCourses = async (courses: Array<{ id: string; name: string }>) => {
  return await db.course.createMany({
    data: courses
  })
}

export const addManyCourseAndLecturers = async (courseLecturers: ICourseLecture[]) => {
  return await db.courseLecture.createMany({
    data: courseLecturers
  })
}

export const readXlsx = (filePath: string) => {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

  return worksheet
}

export const validateColumns = (worksheet: unknown[], requiredColumns: string[]) => {
  if (!worksheet.length || !requiredColumns.every((col) => col in (worksheet[0] as Record<string, unknown>))) {
    return false
  }

  return true
}

export const validateDuplicateIds = (ids: string[]) => {
  const uniqueIds = new Set(ids) // remove all duplicate id
  return uniqueIds.size !== ids.length
}

export const fetchLecturersByIds = async (ids: string[]) => {
  return await db.lecture.findMany({
    where: {
      id: { in: ids }
    },
    select: { id: true }
  })
}

export const fetchCoursesByIds = async (ids: string[]) => {
  return await db.course.findMany({
    where: {
      id: { in: ids }
    },
    select: { id: true }
  })
}

interface IFetchCourseAndLecturersParams {
  id_dosen: string
  id_mata_kuliah: string
}

export const fetchCourseAndLecturersByCourseIdAndLectureId = async (payload: IFetchCourseAndLecturersParams[]) => {
  return await db.courseLecture.findMany({
    where: {
      OR: payload.map((row) => ({
        lecture_id: row.id_dosen,
        course_id: row.id_mata_kuliah
      }))
    },
    select: { lecture_id: true, course_id: true }
  })
}

export const fetchLecturesByName = async (names: string) => {
  return await db.lecture.findFirst({
    where: {
      name: { contains: names }
    }
  })
}

export const checkMatkulAnswer = async (lectureId: string, courseName: string) => {
  return await db.courseLecture.findFirst({
    where: {
      lecture_id: lectureId,
      course: {
        name: { contains: courseName }
      }
    }
  })
}
