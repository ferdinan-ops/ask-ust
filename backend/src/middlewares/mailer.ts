import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'

import logger from '../utils/logger'
import ENV from '../utils/environment'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.emailUsername as string,
    pass: ENV.emailPassword as string
  }
})

const sendMail = (options: Mail.Options) => {
  transporter.sendMail(options, (error, info) => {
    if (error) throw error
    logger.info('Email sent: ' + info.response)
  })
}

export default sendMail
