import { type JwtPayload } from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: string
  }
}
