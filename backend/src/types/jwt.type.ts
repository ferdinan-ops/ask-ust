import { UserRole } from '@prisma/client'
import { type JwtPayload } from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: string
    isAdmin: boolean
    role: UserRole
  }
}
