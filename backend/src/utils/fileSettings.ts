import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const deleteFile = async (filePath: string) => {
  fs.unlinkSync(path.join(__dirname, '../../assets', filePath))
}

export const compressedFile = async (filename: string) => {
  return await new Promise((resolve, reject) => {
    const compressedPath = path.join(__dirname, '../../assets', filename)
    const sourcePath = path.join(__dirname, '../../uploads', filename)
    sharp(sourcePath)
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(compressedPath, (error, info) => {
        if (error) {
          reject(error)
        } else {
          fs.unlinkSync(path.join(__dirname, '../../uploads', filename))
          resolve(filename)
        }
      })
  })
}
