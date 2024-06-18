declare namespace Express {
  interface Request {
    userId?: string
    io?: import('socket.io').Server
    isAdmin?: boolean

    files?: {
      file: {
        name: string
        data: Buffer
      }
      photo: {
        name: string
        data: Buffer
      }
    }
  }
}
