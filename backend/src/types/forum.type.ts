import { ForumPrivacy } from '@prisma/client'

export interface IForum {
  title?: string
  image?: string
  privacy?: ForumPrivacy
  description: string
}
