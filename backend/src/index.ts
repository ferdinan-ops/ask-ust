import path from 'path'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express, { type Request, type Application } from 'express'

import routes from './routes'
import logger from './utils/logger'
import * as socket from './middlewares/socket'

const port: number = 3000
const app: Application = express()
const server = http.createServer(app)
socket.initializeSocket(server)

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use((req: Request, res, next) => {
  req.io = socket.getIO()
  next()
})

routes(app)

app.use('/storage', express.static(path.join(__dirname, '../storage')))

server.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
