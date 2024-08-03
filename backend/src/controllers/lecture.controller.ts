import { Request, Response } from 'express'
import * as LectureService from '../services/lecture.service'
import { logInfo, logWarn } from '../utils/logger'
import { ILecture } from '../types/lecture.type'

// Lecturers
export const getLecturers = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10
  const search = q as string

  try {
    const { data, count } = await LectureService.fetchLecturers(currentPage, perPage, search)
    logInfo(req, 'Lecturers fetched successfully')
    res.status(200).json({
      message: 'Data dosen berhasil diambil',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const importLecturers = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    const worksheet = LectureService.readXlsx(req.file.path) as ILecture[]

    // Check if required columns exist
    const requiredColumns = ['id', 'nama']
    const isColumnsValid = LectureService.validateColumns(worksheet, requiredColumns)

    if (!isColumnsValid) {
      logWarn(req, 'Invalid columns')
      return res.status(400).json({ message: 'Kolom tidak valid. Kolom yang harus diisi adalah: id dan nama' })
    }

    // Check for duplicate IDs
    const ids = worksheet.map((row) => row.id)
    const isDuplicateIds = LectureService.validateDuplicateIds(ids)

    if (isDuplicateIds) {
      logWarn(req, 'Duplicate IDs')
      return res.status(400).json({ message: 'Ada ID yang duplikat' })
    }

    // Get existing user IDs from the database
    const existingLecturers = await LectureService.fetchLecturersByIds(ids)
    const existingLecturersIds = new Set(existingLecturers.map((lecturer) => lecturer.id))
    const newLecturers = worksheet.filter((lecturer) => !existingLecturersIds.has(lecturer.id))

    const lectures = newLecturers.map((lecture) => ({
      id: lecture.id,
      name: lecture.nama
    }))

    if (lectures.length) await LectureService.addManyLecturers(lectures)
    logInfo(req, 'Lecturers imported successfully')
    res.status(201).json({ message: 'Data dosen berhasil diimpor' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

// Courses
export const getCourses = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10
  const search = q as string

  try {
    const { data, count } = await LectureService.fetchCourses(currentPage, perPage, search)
    logInfo(req, 'Courses fetched successfully')
    res.status(200).json({
      message: 'Data mata kuliah berhasil diambil',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const importCourses = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    const worksheet = LectureService.readXlsx(req.file.path) as ILecture[]

    // Check if required columns exist
    const requiredColumns = ['id', 'nama']
    const isColumnsValid = LectureService.validateColumns(worksheet, requiredColumns)

    if (!isColumnsValid) {
      logWarn(req, 'Invalid columns')
      return res.status(400).json({ message: 'Kolom tidak valid. Kolom yang harus diisi adalah: id dan nama' })
    }

    // Check for duplicate IDs
    const ids = worksheet.map((row) => row.id)
    const isDuplicateIds = LectureService.validateDuplicateIds(ids)

    if (isDuplicateIds) {
      logWarn(req, 'Duplicate IDs')
      return res.status(400).json({ message: 'Ada ID yang duplikat' })
    }

    // Get existing user IDs from the database
    const existingCourses = await LectureService.fetchLecturersByIds(ids)
    const existingCoursesIds = new Set(existingCourses.map((course) => course.id))
    const newCourses = worksheet.filter((course) => !existingCoursesIds.has(course.id))

    const courses = newCourses.map((course) => ({
      id: course.id.toString(),
      name: course.nama
    }))

    if (courses.length) await LectureService.addManyCourses(courses)
    logInfo(req, 'Courses imported successfully')
    res.status(201).json({ message: 'Data mata kuliah berhasil diimpor' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getCourseAndLecturers = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10
  const search = q as string

  try {
    const { data, count } = await LectureService.fetchCourseAndLecturers(currentPage, perPage, search)
    logInfo(req, 'Lecturers fetched successfully')
    res.status(200).json({
      message: 'Data relasi dosen dengan mata kulah berhasil diambil',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

interface ICourseLectureExcel {
  id_dosen: string
  id_mata_kuliah: string
}

export const importCourseAndLecturers = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    const worksheet = LectureService.readXlsx(req.file.path) as ICourseLectureExcel[]

    // Check if required columns exist
    const requiredColumns = ['id_dosen', 'id_mata_kuliah']
    const isColumnsValid = LectureService.validateColumns(worksheet, requiredColumns)

    if (!isColumnsValid) {
      logWarn(req, 'Invalid columns')
      return res.status(400).json({
        message: 'Kolom tidak valid. Kolom yang harus diisi adalah: id_dosen dan id_mata_kuliah'
      })
    }

    // check for duplicates data in the file
    const combinationSet = new Set()
    const uniqueRows = worksheet.filter((row) => {
      const combinationKey = `${row.id_dosen}-${row.id_mata_kuliah}`
      if (combinationSet.has(combinationKey)) {
        return false
      }
      combinationSet.add(combinationKey)
      return true
    })

    // Get existing teaching assignments from the database
    const existingCourseLecturers = await LectureService.fetchCourseAndLecturersByCourseIdAndLectureId(uniqueRows)
    const existingCourseLecturersSet = new Set(
      existingCourseLecturers.map((assignment) => `${assignment.lecture_id}-${assignment.course_id}`)
    )
    const newCourseLecturers = uniqueRows.filter(
      (row) => !existingCourseLecturersSet.has(`${row.id_dosen}-${row.id_mata_kuliah}`)
    )

    const courseLecturers = newCourseLecturers.map((course) => ({
      lecture_id: course.id_dosen,
      course_id: course.id_mata_kuliah
    }))

    if (courseLecturers.length) await LectureService.addManyCourseAndLecturers(courseLecturers)
    logInfo(req, 'Courses Lecturers imported successfully')
    res.status(201).json({ message: 'Data relasi dosen dengan mata kuliah berhasil diimpor' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
