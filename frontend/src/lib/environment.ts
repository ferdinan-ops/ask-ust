const ENV = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  storageUrl: import.meta.env.VITE_STORAGE_URL as string,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  livekitUrl: import.meta.env.VITE_LIVEKIT_URL as string,
  livekitApiKey: import.meta.env.VITE_LIVEKIT_API_KEY as string,
  livekitApiSecret: import.meta.env.VITE_LIVEKIT_API_SECRET as string,
  videoSdkToken: import.meta.env.VITE_VIDEOSDK_TOKEN as string,
  apiKeyTinyMce: import.meta.env.VITE_TINY_MCE_API_KEY as string,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  supabaseBucketName: import.meta.env.VITE_SUPABASE_BUCKET_NAME as string
}

export default ENV
