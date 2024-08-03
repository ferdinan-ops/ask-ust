declare namespace Express {
  interface Request {
    userId?: string
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
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
