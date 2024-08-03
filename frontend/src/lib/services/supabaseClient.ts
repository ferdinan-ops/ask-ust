import { createClient } from '@supabase/supabase-js'
import ENV from '../environment'
import { v4 } from 'uuid'

const supabase = createClient(ENV.supabaseUrl, ENV.supabaseKey)

export const uploadVideoToBucket = async (file: File) => {
  try {
    const fileName = `recordings/${v4()}-${new Date().toISOString()}-${file.name}.mp4`
    const { data, error } = await supabase.storage.from(ENV.supabaseBucketName).upload(fileName, file)

    if (error) throw error

    if (data) {
      const results = supabase.storage.from(ENV.supabaseBucketName).getPublicUrl(fileName)
      return results.data.publicUrl
    }
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

export default supabase
