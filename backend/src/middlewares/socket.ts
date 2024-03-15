import { Server as ServerIO } from 'socket.io'
import type http from 'http'
import logger from '../utils/logger'

let io: ServerIO

export const initializeSocket = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  io = new ServerIO(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    logger.info('a user connected')

    socket.on('disconnect', () => {
      logger.error('user disconnected')
    })
  })
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}
