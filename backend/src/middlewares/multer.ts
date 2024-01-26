import { type Request } from 'express'
import multer from 'multer'
import { v4 } from 'uuid'

import logger from '../utils/logger'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads')
  },
  filename: (_req, file, cb) => {
    cb(null, v4() + '-' + file.originalname)
  }
})

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg', 'image/gif']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    logger.info('File type not supported')
    cb(new Error('File type not supported'))
  }
}

const upload = multer({
  storage,
  fileFilter
})

export default upload
