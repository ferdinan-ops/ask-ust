declare namespace Express {
  interface Request {
    userId?: string
    io?: import('socket.io').Server
    isAdmin?: boolean

    files?: {
      file: Array<{
        filename: string
        data: Buffer
      }>
      photo: Array<{
        filename: string
        data: Buffer
      }>
    }
  }
}
