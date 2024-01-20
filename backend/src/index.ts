import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express, { type Application } from 'express'

import routes from './routes'
import logger from './utils/logger'

const app: Application = express()
const port: number = 3000

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.use('/storage', express.static(path.join(__dirname, '../storage')))

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
