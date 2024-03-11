import { type Response } from 'express'
import { type Server as NetServer, type Socket } from 'net'
import { type Server as SocketIOServer } from 'socket.io'

export type ResponseServerIo = Response & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
