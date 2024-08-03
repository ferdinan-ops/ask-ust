import dotenv from 'dotenv'

dotenv.config()

const ENV = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  emailUsername: process.env.EMAIL_USERNAME,
  aplicationName: process.env.APPLICATION_NAME,
  emailBannerUrl: process.env.EMAIL_BANNER_URL,
  emailPassword: process.env.EMAIL_PASSWORD,
  publicUrl: process.env.PUBLIC_URL,
  livekitApiKey: process.env.LIVEKIT_API_KEY,
  livekitApiSecret: process.env.LIVEKIT_API_SECRET,
  messageBatch: process.env.MESSAGE_BATCH,
  perspectiveApiKey: process.env.PERSPECTIVE_API_KEY,
  discoveryUrl: process.env.DISCOVERY_URL,
  violationTimeLimit: new Date(Date.now() - 300 * 1000),
  banOneDay: new Date(Date.now() + 24 * 60 * 60 * 1000),
  questionDosenId: process.env.QUESTION_DOSEN_UUID,
  questionMatkulId: process.env.QUESTION_MATA_KULIAH_UUID
}

export default ENV
