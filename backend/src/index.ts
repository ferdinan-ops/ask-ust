import express, { type Application } from 'express'
import path from 'path'
import logger from './utils/logger'

const app: Application = express()
const port: number = 5000

app.use(express.json())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use('/storage', express.static(path.join(__dirname, '../storage')))

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
