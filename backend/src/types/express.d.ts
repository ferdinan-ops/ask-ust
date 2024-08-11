declare namespace Express {
  interface Request {
    userId?: string
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
    io?: import('socket.io').Server
    isAdmin?: boolean

    files?: {
      valid_file: any[]
      photo: any[]
    }
  }
}
