import dotenv from 'dotenv'

dotenv.config()

const ENV = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,
  publicUrl: process.env.PUBLIC_URL
}

export default ENV
