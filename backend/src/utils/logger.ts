import pino from 'pino'
import type Joi from 'joi'
import moment from 'moment'
import pretty from 'pino-pretty'
import { type Request } from 'express'

const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `, "time":"${moment().format()}"`
  },
  pretty()
)

export const logError = (req: Request, error: Joi.ValidationError | string) => {
  logger.error(`[${req.method}]: ${req.originalUrl}\t${typeof error === 'string' ? error : error.details[0].message}`)
}

export const logWarn = (req: Request, message: string) => {
  logger.warn(`[${req.method}]: ${req.originalUrl}\t${message}`)
}

export const logInfo = (req: Request, message: string) => {
  logger.info(`[${req.method}]: ${req.originalUrl}\t${message}`)
}

export default logger
