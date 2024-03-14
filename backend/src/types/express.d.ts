declare namespace Express {
  interface Request {
    userId?: string
    io?: import('socket.io').Server
  }
}
