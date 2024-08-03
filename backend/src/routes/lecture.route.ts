import express from 'express'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import {
  getCourseAndLecturers,
  getCourses,
  getLecturers,
  importCourseAndLecturers,
  importCourses,
  importLecturers
} from '../controllers/lecture.controller'
import upload from '../middlewares/multer'

const lectureRoute = express.Router()

lectureRoute.get('/lecture', verifyJwt, verifyAdmin, getLecturers)
lectureRoute.get('/course', verifyJwt, verifyAdmin, getCourses)
lectureRoute.get('/course-lecture', verifyJwt, verifyAdmin, getCourseAndLecturers)
lectureRoute.post('/lecture/import', upload.single('file'), verifyJwt, verifyAdmin, importLecturers)
lectureRoute.post('/course/import', verifyJwt, verifyAdmin, upload.single('file'), importCourses)
lectureRoute.post('/course-lecture/import', verifyJwt, verifyAdmin, upload.single('file'), importCourseAndLecturers)

export default lectureRoute
