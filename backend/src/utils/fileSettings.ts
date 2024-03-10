import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const deleteFile = async (filePath: string) => {
  fs.unlinkSync(path.join(__dirname, '../../storage', filePath))
}

export const compressedFile = async (filename: string) => {
  return await new Promise((resolve, reject) => {
    const compressedPath = path.join(__dirname, '../../storage', filename)
    const sourcePath = path.join(__dirname, '../../uploads', filename)
    sharp(sourcePath)
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(compressedPath, (error, info) => {
        if (error) {
          reject(error)
        } else {
          // this commented line is to delete the original file
          // but in windows, we must give permission to delete the file
          // fs.unlinkSync(sourcePath)
          resolve(filename)
        }
      })
  })
}
