import { createClient } from '@supabase/supabase-js'
import ENV from '../utils/environment'

import { v4 } from 'uuid'
import { decode } from 'base64-arraybuffer'
import { Express } from 'express'

const supabase = createClient(ENV.supabaseUrl as string, ENV.supabaseKey as string)

export const uploadFileToBucket = async (file: Express.Multer.File) => {
  try {
    const fileName = `storage/${v4()}-${file.originalname}`
    const fileBase64 = decode(file.buffer.toString('base64'))
    const { data, error } = await supabase.storage.from(ENV.supabaseBucketName as string).upload(fileName, fileBase64, {
      contentType: file.mimetype
    })

    if (error) throw error

    if (data) {
      const results = supabase.storage.from(ENV.supabaseBucketName as string).getPublicUrl(fileName)
      return results.data.publicUrl
    }
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

const supabaseRecord = createClient(ENV.supabaseRecordUrl as string, ENV.supabaseRecordKey as string)

export const uploadRecordToBucket = async (file: Express.Multer.File) => {
  try {
    const fileName = `recordings/${v4()}-${file.originalname}`
    const fileBase64 = decode(file.buffer.toString('base64'))
    const { data, error } = await supabaseRecord.storage
      .from(ENV.supabaseRecordBucketName as string)
      .upload(fileName, fileBase64, {
        contentType: file.mimetype
      })

    if (error) throw error

    if (data) {
      const results = supabaseRecord.storage.from(ENV.supabaseRecordBucketName as string).getPublicUrl(fileName)
      return results.data.publicUrl
    }
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}
