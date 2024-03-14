import { Server as ServerIO } from 'socket.io'
import type http from 'http'

let io: ServerIO

export const initializeSocket = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  io = new ServerIO(server)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}
